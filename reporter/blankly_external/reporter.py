"""
    Class for allowing easy user reporting to external processes
    Copyright (C) Emerson Dove - All Rights Reserved
    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
    Written by Emerson Dove, 2021
"""

import sys
import threading
import time
import typing
from typing import Any

from blankly_external.server import Connection

backtesting = False


def supress_while_backtesting(func):
    """
    This will return out of any function it is decorated on if backtesting is enabled

    :param func: The function to evaluate
    :return:
    """

    def wrapper(*args, **kwargs):
        # Here is the return check
        if backtesting:
            return
        return func(*args, **kwargs)

    return wrapper


class Reporter:
    def __init__(self, connection: Connection):
        global backtesting
        self.connection = connection
        # Set this globally
        backtesting = self.connection.backtesting

        self.connection.assign_callback_reporter(self)
        self.__live_vars = {}
        self.__live_var_hash_map = {}
        self.__strategies = {}
        self.__screener = None

    def export_live_var(self, var: Any, name: str, description: str = None):
        """
        Create a variable that can be updated by external processes
        All strings must be in ascii characters

        Args:
            var: Any variable that can represented in a string (ex: float, str, int)
            name: The name of the live_var
            description (optional): A longer description for use in GUIs or other areas where context is important
        """
        id_ = id(var)
        hash_ = self.__hash(id_)
        self.__live_var_hash_map[hash_] = id_
        format_message = self.connection.format_message('live_var', {'id': hash_, 'value': var, 'name': name,
                                                                     'description': description, 'type': type(var)})
        self.connection.send(format_message)
        self.__live_vars[id_] = {'value': var,
                                 'name': name,
                                 'description': description,
                                 'type': type(var)
                                 }

    def update_live_var(self, var):
        """
        Get the variable as with any changes that may have occurred

        Args:
            var: The variable that was exported initially
        """
        return self.__live_vars[id(var)]['value']

    def __re_export_live_var(self, id_: int):
        # Get the internal variable dictionary based on the mapped hash value of the input
        var_dict = self.__live_vars[id_]
        hash_ = self.__hash(id_)
        format_message = self.connection.format_message('live_var', {'id': hash_,
                                                                     'value': var_dict['value'],
                                                                     'name': var_dict['name'],
                                                                     'description': var_dict['description'],
                                                                     'type': var_dict['type']})
        self.connection.send(format_message)

    def __internal_error(self, error_details: dict):
        self.connection.send(self.connection.format_message('internal_error', {'error_details': error_details}))

    def remote_var_update(self, hash_: int, value: Any):
        """
        Write an update from an external process into the live var dictionary for use by the user

        Args:
            hash_: The hash of the python ID
            value: The new updated value for the variable
        """
        id_ = self.__live_var_hash_map[hash_]
        # Take in this new value & update
        current_value = self.__live_vars[id_]

        # Perform casting & updating
        var_type = current_value['type']
        current_value['value'] = var_type(value)

        # Write it out
        self.__live_vars[id_] = current_value

        self.__re_export_live_var(id_)

    def backtest_runner(self, kwargs):
        # Check if the main thread is active every two seconds until it dies, then the backtest
        #  can be run
        def is_main_active():
            for thread in threading.enumerate():
                if thread.name == "MainThread" and thread.is_alive():
                    return True
            return False

        while is_main_active():
            time.sleep(4)

        print("Starting backtest...")

        backtesting_time = time.time()
        try:
            # This blocking call can very easily be used to calculate backtest time
            try:
                first_strategy = self.__strategies[list(self.__strategies.keys())[0]]
            except IndexError:
                raise IndexError("No strategy definition found in model.")
            # Here is the actual backtest call
            first_strategy.backtest(**kwargs)
            backtesting_time = time.time() - backtesting_time
            format_message = self.connection.format_message('backtest_status',
                                                            {
                                                                'successful': True,
                                                                'status_summary': f'Backtest successful',
                                                                'status_details': "",
                                                                'time_elapsed': backtesting_time,
                                                                'backtesting_id': self.connection.backtesting_id
                                                            })
        except Exception as e:
            print('error: ', e)
            backtesting_time = time.time() - backtesting_time
            format_message = self.connection.format_message('backtest_status',
                                                            {
                                                                'successful': False,
                                                                'status_summary': 'error',
                                                                'status_details': e,
                                                                'time_elapsed': backtesting_time,
                                                                'backtesting_id': self.connection.backtesting_id
                                                            })

        self.connection.send(format_message)
        sys.exit(1)

    def __order_update(self, command, response, exchange):
        response['exchange'] = exchange
        format_message = self.connection.format_message(command,
                                                        response)
        self.connection.send(format_message)

    def log_market_order(self, response, exchange):
        self.__order_update('market_order', response, exchange)

    def log_limit_order(self, response, exchange):
        self.__order_update('limit_order', response, exchange)

    def update_order(self, response, exchange):
        self.__order_update('update_order', response, exchange)

    def annotate_order(self, order_id, annotation):
        self.connection.format_message('update_annotation',
                                       {
                                           'id': order_id,
                                           'annotation': annotation
                                       })

    def export_screener_result(self, screener):
        """
        Re-export for the finished signal result

        Args:
            screener: A signal object to export
        """

        format_message = self.connection.format_message('screener_result',
                                                        {
                                                            'result': {
                                                                'screener': screener.raw_results,
                                                                # This screener.status dictionary is used to store all
                                                                #  .status info created inside the screener object
                                                                'status': screener.status
                                                            }
                                                        })

        self.connection.send(format_message)

    def export_screener(self, screener):
        """
        Export a strategy for use in viewing in a GUI
        :param screener: The strategy object to locate
        :return: None
        """
        pass

    def export_strategy(self, strategy):
        """
        Export a strategy for use in viewing in a GUI
        :param strategy: The strategy object to locate
        :return: None
        """
        hash_ = self.__hash(id(strategy))
        format_message = self.connection.format_message('strategy_export',
                                                        {'id': hash_})

        self.__strategies[hash_] = strategy
        self.connection.send(format_message)

    def export_backtest_result(self, platform_result: dict):
        """
        Export the finished backtest result

        Args:
            platform_result: The package formatted platform result dictionary
        """
        # Do not return anything if we are not in a backtesting configuration
        if not self.connection.backtesting:
            print("Skipping backtest export")
            return

        format_message = self.connection.format_message('backtest_result',
                                                        platform_result)

        self.connection.send(format_message)

    @staticmethod
    def format_metric(metrics: dict, display_name, type_: str):
        return {
            "value": metrics[display_name],
            "display_name": display_name,
            "type": type_
        }

    @supress_while_backtesting
    def export_used_exchange(self, exchange_name):
        """
        Export a strategy event that has occurred
        """
        format_message = self.connection.format_message('used_exchange',
                                                        {
                                                            'exchange': exchange_name
                                                        })
        self.connection.send(format_message)

    @supress_while_backtesting
    def export_used_symbol(self, symbol):
        """
        Export the currency name for a used currency
        """
        format_message = self.connection.format_message('used_symbol',
                                                        {
                                                            'symbol': symbol
                                                        })
        self.connection.send(format_message)

    @staticmethod
    def __hash(value: typing.Any) -> int:
        """
        Create a positive integer of a hash value

        :param value: Any value to take the hash of
        :return: A positive integer version of the hash
        """
        h = hash(value)
        if h < 0:
            h += sys.maxsize

        return h

    @staticmethod
    def __parse_backtest_trades(trades: list, limit_executed: list, limit_canceled: list, market_executed: list):
        """
        Determine the lifecycle of limit orders

        :param trades: The list of trades from the backtest
        :param limit_executed: The list of limit orders that were executed
        :param limit_canceled: The list of limit orders that were canceled
        :param market_executed: The list of executed market orders
        :return: None
        """

        # Now just parse if there should be an executed time or a canceled time
        for i in range(len(trades)):
            trades[i]['time'] = trades[i].pop('created_at')
            if trades[i]['type'] == 'limit':
                # TODO this wastes a few CPU cycles at the moment so it could be cleaned up
                for j in limit_executed:
                    if trades[i]['id'] == j['id']:
                        trades[i]['time'] = j['executed_time']
                        trades[i]['price'] = trades[i]['price']
                        break

                for j in limit_canceled:
                    if trades[i]['id'] == j['id']:
                        trades[i]['canceledTime'] = j['canceled_time']
                        break
            elif trades[i]['type'] == 'market':
                # This adds in the execution price for the market orders
                trades[i]['type'] = 'spot-market'
                for j in market_executed:
                    if trades[i]['id'] == j['id']:
                        trades[i]['price'] = j['executed_price']
                        break

        return trades

    @staticmethod
    def __compress_dict_series(values_column: dict, time_dictionary: dict):
        """
        Remove duplicate keys from the account value or anything that is associated with a time series

        :param values_column: A dictionary with index as key and any sort of value
        :param time_dictionary: A dictionary with index also as key but a time that corresponds to the same index in the
            values column
        :return: None
        """
        values_keys = list(values_column.keys())
        time_keys = list(time_dictionary.keys())

        # Check to see if the dictionaries are longer than 0
        if len(values_keys) == 0:
            return {}

        last_value = values_column[values_keys[0]]
        output_dict = {
            time_dictionary[time_keys[0]]: last_value
        }
        for i in range(len(values_column)):
            if last_value != values_column[values_keys[i]]:
                output_dict[time_dictionary[time_keys[i]]] = values_column[values_keys[i]]

                last_value = values_column[values_keys[i]]

        return output_dict

    @staticmethod
    def __dict_from_df_dict(dict_of_df: dict) -> dict:
        """
        This creates a serializable dictionary from a dictionary with pandas df:
        {
            'AAPL': df.DataFrame
            'MSFT': df.DataFrame
        }
        ->
        {
            'AAPL': df.DataFrame.to_dict()
            'MSFT': df.DataFrame.to_dict()
        }
        The function does not check for nested dataframes

        :arg dict_of_df: A dictionary with dataframes as values of the internal keys
        :return: dict
        """
        output_dict = {}
        for i in list(dict_of_df.keys()):
            output_dict[i] = dict_of_df[i].to_dict()

        return output_dict

    @supress_while_backtesting
    def email(self, email: str):
        """
        Send an email to the email accounts attached to the user profile

        :param email: The message as a string
        :return: None
        """
        format_message = self.connection.format_message('email', {'message': email})
        self.connection.send(format_message)

    @supress_while_backtesting
    def text(self, text: str):
        """
        Send a text message to the phone number attached to the user account

        :param text: The string of the body for sending the text message
        :return: None
        """
        format_message = self.connection.format_message('text', {'message': text})
        self.connection.send(format_message)
