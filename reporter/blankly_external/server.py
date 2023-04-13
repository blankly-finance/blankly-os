"""
    ZeroMQ server for communicating with other languages or GUIs
    Copyright (C) Emerson Dove - All Rights Reserved
    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
    Written by Emerson Dove, 2021
"""

import json
import threading
import os
import zmq
import time


def test_for_backtesting():
    """
    Tests if the environment is configured for backtesting. This is duplicated code from the package
    """
    __backtesting_env = os.getenv('BACKTESTING')
    if __backtesting_env is not None:
        backtesting = __backtesting_env == '1'
        backtesting_id = os.getenv('BACKTESTING_ID')
    else:
        backtesting = False
        backtesting_id = None
    return backtesting, backtesting_id


class Connection:
    def __init__(self):
        # Read from the backtesting environment variables
        self.backtesting, self.backtesting_id = test_for_backtesting()

        # Create a thread and a global connection variable
        self.__thread = None
        self.connected = False

        self.reporter = None

        # Setup zmq connection prereqs
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.PAIR)

        self.__send_buffer = []

        # The most important part here is to set daemon status based on if it is backtesting or not
        # A daemon of false will keep the process alive. Remember they are inverses
        # daemon_ = not backtesting

        if not self.backtesting:
            self.__thread = threading.Thread(target=self.__establish_connection, daemon=True)
            self.__thread.start()
        else:
            self.__establish_connection()

    def assign_callback_reporter(self, callback):
        self.reporter = callback

    def __establish_connection(self):
        """
        Connection function to develop a connected state

        :return: None
        """
        try:
            self.socket.connect("tcp://localhost:5555")
        except zmq.error.ZMQError:
            # If logging is implemented this could write to the log in the background
            pass

        # # Loop this portion to allow continuous connection attempts
        # while True:
        #     # Set a timeout of ten seconds to connect
        #     self.socket.set(zmq.RCVTIMEO, 10000)
        #
        #     try:
        #         # Wait the delay time for the initialization request
        #         message = self.socket.recv()
        #         if message == b"ping":
        #             # If the message is not a ping then it doesn't count as successful
        #             self.connected = True
        #             self.socket.send(b"pong")
        #
        #             # Reset this to be infinite amount of time
        #             self.socket.set(zmq.RCVTIMEO, -1)
        #         else:
        #             print(f"Received unexpected connection request: {message}")
        #     except Again:
        #         # print("connection failed")
        #         pass

        # Continue the connection by listening
        # Send a connection pong when the process starts
        self.socket.send(b'active')
        self.__receiver()

    def __receiver(self):
        while True:
            try:
                # Run the buffer in case there are lingering commands
                self.__run_buffer()

                #  Wait for next request from client
                message: bytes = self.socket.recv()

                string_message = message.decode('utf-8')

                # Any parsing if it's a string can be done here
                if string_message == 'ping':
                    # print('connected')
                    self.connected = True
                    self.socket.send(b'pong')
                    continue

                # Continue here if it's actually a JSON
                json_response = self.decode_json(string_message)
                command = list(json_response.keys())[0]

                if command == "update_live_var":
                    hash_ = int(json_response[command]['id'])
                    self.reporter.remote_var_update(hash_, json_response[command]['value'])
                elif command == "backtest":
                    # print("backtest command")
                    kwargs: dict = json_response[command]['kwargs']
                    thread = threading.Thread(target=self.request_backtest, daemon=False, args=(kwargs,),
                                              name='Backtest Runner')
                    thread.start()
                    if self.backtesting:
                        break
            except Exception as e:
                print(e)

    def request_backtest(self, kwargs):
        """
        Why do we do this? This might seem dumb and it is.
        It's because we need to access the reporter, but it isn't created yet because we are
        in the main thread if we're backtesting

        :param kwargs: Dictionary to give the backtest
        :return: None
        """
        time.sleep(1)
        self.reporter.backtest_runner(kwargs)

    @staticmethod
    def __pad(existing: str, payload: str) -> str:
        """
        Pad an existing command string with a new section

        Args:
            existing (str): The existing string
            payload (str): The new payload portion to add to the string
        """
        return existing + str(payload) + "\x0f"

    @staticmethod
    def decode_json(response: str) -> dict:
        try:
            return json.loads(response)
        except json.decoder.JSONDecodeError:
            print(f"Failure reading string: {response}")

    @staticmethod
    def format_message(command: str, internals: dict) -> str:
        """
        Format a message for sending to a node or external process

        Args:
            command: The general command to use
            internals: A dictionary containing the keys to send over under this command

        Commands:
            live_var: Create a live_var variable that can be updated from node
                id (required): The python ID of the variable. Generally found with id(var)
                value (required): The current value of the live var
                name (required): A required name for the variable. This should be short but descriptive such as
                    "RSI Low"
                description (optional): A longer description for use in GUIs or other areas where context is important
            TODO add all commands to this docstring
        """
        # Use shift in/shift out characters to show each section of request
        message_dict = {command: {}}

        for i in internals.keys():
            # Skip any variables that were None
            if internals[i] is not None:
                if isinstance(internals[i], dict) or \
                        isinstance(internals[i], list) or \
                        isinstance(internals[i], float) or \
                        isinstance(internals[i], int):
                    message_dict[command][i] = internals[i]
                else:
                    message_dict[command][i] = str(internals[i])

        try:
            return json.dumps(message_dict)
        except TypeError:
            print(f"Failure serializing message: {message_dict}")

    def __run_buffer(self):
        """
        This function will begin actually sending everything inside the buffer as it has a chance
        """
        if self.connected:
            while self.__send_buffer:
                self.socket.send(self.__send_buffer.pop(0))

    def send(self, message: str):
        """
        Add the message to the buffer

        Args:
            message: ASCII compatible (generally should be sent through a formatter) message
        """
        try:
            self.__send_buffer.append(message.encode('ascii'))
        except UnicodeEncodeError:
            raise RuntimeError("Failed to send, only ASCII characters are currently supported in message")

        self.__run_buffer()
