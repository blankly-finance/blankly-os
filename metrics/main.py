import quantstats as qs
from flask import Flask, request
from flask_cors import CORS
from waitress import serve
from sentry_sdk.integrations.flask import FlaskIntegration
import sentry_sdk
import os
import json
import pandas as pd
from pandas import DataFrame
import numpy as np
from werkzeug.utils import secure_filename

sentry_sdk.init(
    dsn="https://54734eae12e74fe1845015449fe96eb2@o1151739.ingest.sentry.io/6257003",
    integrations=[FlaskIntegration()],
    traces_sample_rate=0.4
)

app = Flask(__name__)
CORS(app)

# ['Start Period', 'End Period', 'Risk-Free Rate ', 'Time in Market ', 'Cumulative Return ', 'CAGR﹪', 'Sharpe',
# 'Smart Sharpe', 'Sortino', 'Smart Sortino', 'Sortino/√2', 'Smart Sortino/√2', 'Omega', 'Max Drawdown ',
# 'Longest DD Days', 'Volatility (ann.) ', 'Calmar', 'Skew', 'Kurtosis', 'Expected Daily %',
# 'Expected Monthly %', 'Expected Yearly %', 'Kelly Criterion ', 'Risk of Ruin ', 'Daily Value-at-Risk ',
# 'Expected Shortfall (cVaR) ', 'Gain/Pain Ratio', 'Gain/Pain (1M)', 'Payoff Ratio', 'Profit Factor',
# 'Common Sense Ratio', 'CPC Index', 'Tail Ratio', 'Outlier Win Ratio', 'Outlier Loss Ratio', 'MTD ', '3M ', '6M ',
# 'YTD ', '1Y ', '3Y (ann.) ', '5Y (ann.) ', '10Y (ann.) ', 'All-time (ann.) ', 'Best Day ', 'Worst Day ',
# 'Best Month ', 'Worst Month ', 'Best Year ', 'Worst Year ', 'Avg. Drawdown ', 'Avg. Drawdown Days',
# 'Recovery Factor', 'Ulcer Index', 'Serenity Index', 'Avg. Up Month ', 'Avg. Down Month ', 'Win Days %', 'Win Month %',
# 'Win Quarter %', 'Win Year %']
quantstats_lookup_table = {
    'Start Period': 'startPeriod',
    'End Period': 'endPeriod',
    'Risk-Free Rate ': 'riskFreeRate',
    'Time in Market ': 'timeInMarket',
    'Cumulative Return ': 'cumulativeReturn',
    'CAGR﹪': 'cagr',
    'Sharpe': 'sharpe',
    'Smart Sharpe': 'smartSharpe',
    'Sortino': 'sortino',
    'Smart Sortino': 'smartSortino',
    'Sortino/√2': 'squareRootSortino',
    'Smart Sortino/√2': 'squareRootSmartSortino',
    'Omega': 'omega,',
    'Max Drawdown ': 'maxDrawdown',
    'Longest DD Days': 'longestDDDays',
    'Volatility (ann.) ': 'volatilityAnn',
    'Calmar': 'calmar',
    'Skew': 'skew',
    'Kurtosis': 'kurtosis',
    'Expected Daily %': 'expectedDailyPercent',
    'Expected Monthly %': 'expectedMonthlyPercent',
    'Expected Yearly %': 'expectedYearlyPercent',
    'Kelly Criterion ': 'kellyCriterion',
    'Risk of Ruin ': 'riskOfRuin',
    'Daily Value-at-Risk ': 'dailyValueAtRisk',
    'Expected Shortfall (cVaR) ': 'expectedShortfallcVaR',
    'Gain/Pain Ratio': 'gainPainRatio',
    'Gain/Pain (1M)': 'gainPain1Month',
    'Payoff Ratio': 'payoffRatio',
    'Profit Factor': 'profitFactor',
    'Common Sense Ratio': 'commonSenseRatio',
    'CPC Index': 'cpcIndex',
    'Tail Ratio': 'tailRatio',
    'Outlier Win Ratio': 'outlierWinRatio',
    'Outlier Loss Ratio': 'outlierLossRatio',
    'MTD ': 'mtd',
    '3M ': '3M',
    '6M ': '6M',
    'YTD ': 'YTD',
    '1Y ': '1Y',
    '3Y (ann.) ': '3Yann',
    '5Y (ann.) ': '5Yann',
    '10Y (ann.) ': '10Yann',
    'All-time (ann.) ': 'allTimeAnn',
    'Best Day ': 'bestDay',
    'Worst Day ': 'worstDay',
    'Best Month ': 'bestMonth',
    'Worst Month ': 'worstMonth',
    'Best Year ': 'bestYear',
    'Worst Year ': 'worstYear',
    'Avg. Drawdown ': 'avgDrawdown',
    'Avg. Drawdown Days': 'avgDrawdownDays',
    'Recovery Factor': 'recoveryFactor',
    'Ulcer Index': 'ulcerIndex',
    'Serenity Index': 'serenityIndex',
    'Avg. Up Month ': 'avgUpMonth',
    'Avg. Down Month ': 'avgDownMonth',
    'Win Days %': 'winDaysPercent',
    'Win Month %': 'winMonthPercent',
    'Win Quarter %': 'winQuarterPercent',
    'Win Year %': 'winYearPercent',
}

quantstats_type_lookup = {
    'Start Period': 'metadata',
    'End Period': 'metadata',
    'Risk-Free Rate ': 'metadata',
    'Time in Market ': 'metadata',
    'Cumulative Return ': 'return',
    'CAGR﹪': 'return',
    'Sharpe': 'ratio',
    'Smart Sharpe': 'ratio',
    'Sortino': 'ratio',
    'Smart Sortino': 'ratio',
    'Sortino/√2': 'ratio',
    'Smart Sortino/√2': 'ratio',
    'Omega': 'statistic,',
    'Max Drawdown ': 'return',
    'Longest DD Days': 'return',
    'Volatility (ann.) ': 'return',
    'Calmar': 'ratio',
    'Skew': 'statistic',
    'Kurtosis': 'statistic',
    'Expected Daily %': 'return',
    'Expected Monthly %': 'return',
    'Expected Yearly %': 'return',
    'Kelly Criterion ': 'statistic',
    'Risk of Ruin ': 'risk',
    'Daily Value-at-Risk ': 'risk',
    'Expected Shortfall (cVaR) ': 'risk',
    'Gain/Pain Ratio': 'ratio',
    'Gain/Pain (1M)': 'return',
    'Payoff Ratio': 'ratio',
    'Profit Factor': 'statistic',
    'Common Sense Ratio': 'ratio',
    'CPC Index': 'statistic',
    'Tail Ratio': 'ratio',
    'Outlier Win Ratio': 'ratio',
    'Outlier Loss Ratio': 'ratio',
    'MTD ': 'return',
    '3M ': 'return',
    '6M ': 'return',
    'YTD ': 'return',
    '1Y ': 'return',
    '3Y (ann.) ': 'return',
    '5Y (ann.) ': 'return',
    '10Y (ann.) ': 'return',
    'All-time (ann.) ': 'return',
    'Best Day ': 'time',
    'Worst Day ': 'time',
    'Best Month ': 'time',
    'Worst Month ': 'time',
    'Best Year ': 'time',
    'Worst Year ': 'time',
    'Avg. Drawdown ': 'time',
    'Avg. Drawdown Days': 'time',
    'Recovery Factor': 'statistic',
    'Ulcer Index': 'statistic',
    'Serenity Index': 'statistic',
    'Avg. Up Month ': 'time',
    'Avg. Down Month ': 'time',
    'Win Days %': 'statistic',
    'Win Month %': 'statistic',
    'Win Quarter %': 'statistic',
    'Win Year %': 'statistic',
}

quantstats_data_type_lookup = {
    'Start Period': 'number',
    'End Period': 'number',
    'Risk-Free Rate ': 'percentage',
    'Time in Market ': 'number',
    'Cumulative Return ': 'percentage',
    'CAGR﹪': 'percentage',
    'Sharpe': 'number',
    'Smart Sharpe': 'number',
    'Sortino': 'number',
    'Smart Sortino': 'number',
    'Sortino/√2': 'number',
    'Smart Sortino/√2': 'number',
    'Omega': 'number,',
    'Max Drawdown ': 'percentage',
    'Longest DD Days': 'number',
    'Volatility (ann.) ': 'percentage',
    'Calmar': 'number',
    'Skew': 'number',
    'Kurtosis': 'number',
    'Expected Daily %': 'percentage',
    'Expected Monthly %': 'percentage',
    'Expected Yearly %': 'percentage',
    'Kelly Criterion ': 'number',
    'Risk of Ruin ': 'number',
    'Daily Value-at-Risk ': 'number',
    'Expected Shortfall (cVaR) ': 'number',
    'Gain/Pain Ratio': 'number',
    'Gain/Pain (1M)': 'number',
    'Payoff Ratio': 'number',
    'Profit Factor': 'number',
    'Common Sense Ratio': 'number',
    'CPC Index': 'number',
    'Tail Ratio': 'number',
    'Outlier Win Ratio': 'number',
    'Outlier Loss Ratio': 'number',
    'MTD ': 'percentage',
    '3M ': 'percentage',
    '6M ': 'percentage',
    'YTD ': 'percentage',
    '1Y ': 'percentage',
    '3Y (ann.) ': 'percentage',
    '5Y (ann.) ': 'percentage',
    '10Y (ann.) ': 'percentage',
    'All-time (ann.) ': 'percentage',
    'Best Day ': 'number',
    'Worst Day ': 'number',
    'Best Month ': 'number',
    'Worst Month ': 'number',
    'Best Year ': 'number',
    'Worst Year ': 'number',
    'Avg. Drawdown ': 'number',
    'Avg. Drawdown Days': 'number',
    'Recovery Factor': 'number',
    'Ulcer Index': 'number',
    'Serenity Index': 'number',
    'Avg. Up Month ': 'number',
    'Avg. Down Month ': 'number',
    'Win Days %': 'percentage',
    'Win Month %': 'percentage',
    'Win Quarter %': 'percentage',
    'Win Year %': 'percentage',
}


def get_type(value):
    if value in quantstats_lookup_table:
        return quantstats_type_lookup[value]
    else:
        return "other"


def get_data_type(value):
    if value in quantstats_data_type_lookup:
        return quantstats_data_type_lookup[value]
    else:
        return "string"


@app.route('/', methods=['GET'])
def base():
    return {
        'message': 'Welcome to the quantstats service'
    }


UPLOAD_FOLDER = './account_values'
ALLOWED_EXTENSIONS = {'json'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def search_price(values, times, epoch, search_index):
    # In this case because each asset is called individually
    def search(arr, size, x, search_index_):
        while True:
            if search_index_ == size:
                # Must be the last one in the list
                return search_index_ - 1

            if arr[search_index_] <= x <= arr[search_index_ + 1]:
                # Found it in this range
                return search_index_
            else:
                search_index_ += 1

    try:
        # Iterate and find the correct quote price
        index_ = search(times, len(times), epoch, search_index)
        return values[index_]
    except KeyError:
        # Not a currency that we have data for at all
        return 0


def convert_series(sf: pd.Series) -> list:
    sf.replace([np.inf, -np.inf], 0,
               inplace=True)
    df = pd.DataFrame({'time': sf.index, 'value': sf.values}).dropna()
    df['time'] = df['time'].astype(np.int64) // 10 ** 9

    return df.to_dict('records')


def format_metric(metrics_: dict, display_name, type__: str, data_type_: str):
    return {
        "value": metrics_[display_name],
        "display_name": display_name,
        "type": type__,
        "data_type": data_type_
    }


def get_req_args(request_, json_arg, file_arg=""):
    """
    :param request_: flask request
    :param json_arg: argument in flask request json body
    :param file_arg: argument in flask file
    :return: flask requested argument (either benchmark or accountValues)
    """
    if file_arg == "":
        file_arg = json_arg

    if 'file' not in request_.files:
        return request_.json[json_arg]

    file = request_.files['file']
    if allowed_file(file.filename):
        filename = secure_filename(file.filename)
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(path)
        return json.loads(open(path).read())[file_arg]

    return []


def separate_time_value(arr):
    """
    :param arr:
    [
        { 'time': t1, 'value': v1 },
        { 'time': t2, 'value': v2 },
        ...
    ]
    :return:
    time_arr: [t1, t2, ...]
    value_arr: [v1, v2, ...]
    """
    time_arr, val_arr = [], []
    for time_val in arr:
        time_arr.append(time_val['time'])
        val_arr.append(time_val['value'])
    return time_arr, val_arr


def resample_one_day(time_arr, val_arr):
    """
    This function resamples values so there
    is exactly one day between each time.
    :param time_arr: [t1, t2, ...]
    :param val_arr: [v1, v2, ...]
    :return:
    Each t1' and t2' is seperated by exactly one day
    resampled_values: [
        { time: t1', value: v1' },
        { time: t2', value: v2' }
    ]
    """
    resampled_values = []
    epoch_start = time_arr[0]
    epoch_stop = time_arr[-1]
    search_index = 0

    while epoch_start <= epoch_stop:
        resampled_values.append({
            'time': epoch_start,
            'value': search_price(val_arr, time_arr, epoch_start, search_index)
        })
        epoch_start += 86400

    return resampled_values


def get_returns(resampled_values):
    """
    :param resampled_values: [
        { time: t1', value: v1' },
        { time: t2', value: v2' }
    ]
    :return: data frame with index being date_time
             and one column of values
    """
    returns = DataFrame(resampled_values, columns=['time', 'value'])
    returns.index = pd.to_datetime(returns['time'], unit='s')
    returns.drop(columns=['time'])
    # Turn this into a series
    returns = returns['value']
    return returns  # lol


def get_refined_metrics(json_metrics):
    refined_metrics = {}
    for metric in list(json_metrics.keys()):
        type_ = get_type(metric)
        data_type = get_data_type(metric)
        if metric in quantstats_lookup_table:
            refined_metrics[quantstats_lookup_table[metric]] = format_metric(json_metrics, metric, type_, data_type)
        else:
            # If it's not in the lookup table do the best we can
            refined_metrics[metric.replace(' ', '_').lower()] = format_metric(json_metrics, metric, type_, data_type)
    return refined_metrics


@app.route('/get-metrics', methods=['POST'])
def process():
    """
    This endpoint gets metrics for account values. If compare is set to true,
    this endpoint even gets metrics for benchmark and comparison values between
    benchmark and account values
    ---
    request body:
        compare: true,
        accountValues: [
            {
                'time': t1,
                'value': v1
            },
            {
                'time': t2,
                'value': v2
            }
            ...
        ]
        benchmark: same format as accountValues and only appears if compare == true

    response body:
        metrics: { different metrics for account values },
        timeseriesMetrics { timeseries metrics for account values }
        benchmarkMetrics: { benchmark metrics if compare==true },
        compareMetrics: { comparison metrics (between benchmark and account value) if compare==true }
    """
    # Get and format account values
    account_values = get_req_args(request, 'accountValues', 'account_values')
    time_arr, val_arr = separate_time_value(account_values)

    # Ensure that the times are sorted
    time_arr, value_arr = zip(*sorted(zip(time_arr, val_arr)))

    # Resample values so periods between is exactly one day
    resampled_account_values = resample_one_day(time_arr, val_arr)
    returns = get_returns(resampled_account_values)

    # Metrics time baby
    metrics = qs.reports.metrics(returns, display=False, mode='full')
    json_metrics = json.loads(metrics.to_json())['Strategy']
    refined_metrics = get_refined_metrics(json_metrics)

    return_dict = {'metrics': refined_metrics}

    # Time for some time series
    timeseries_metrics = {
        'drawdown': convert_series(qs.stats.to_drawdown_series(returns)),
        'rolling_sharpe': convert_series(qs.stats.rolling_sharpe(returns)),
        # 'rolling_sortino': convert_series(qs.stats.rolling_sortino(returns)),
        'rolling_volatility': convert_series(qs.stats.rolling_volatility(returns)),
    }

    return_dict['timeseriesMetrics'] = timeseries_metrics

    # If frontend wants a comparison, we do the exact same thing
    # (gather benchmark metrics) for benchmark_values
    if 'compare' in request.json:
        benchmark_values = get_req_args(request, 'benchmark')
        benchmark_time_arr, benchmark_val_arr = separate_time_value(benchmark_values)
        benchmark_time_arr, benchmark_value_arr = zip(*sorted(zip(benchmark_time_arr, benchmark_val_arr)))
        resampled_benchmark_values = resample_one_day(benchmark_time_arr, benchmark_val_arr)
        benchmark = get_returns(resampled_benchmark_values)
        benchmark_metrics = qs.reports.metrics(benchmark, display=False, mode='full')
        benchmark_json_metrics = json.loads(benchmark_metrics.to_json())['Strategy']
        benchmark_refined_metrics = get_refined_metrics(benchmark_json_metrics)
        return_dict['benchmarkMetrics'] = benchmark_refined_metrics

        timeseries_metrics = {
            'drawdown': convert_series(qs.stats.to_drawdown_series(benchmark)),
            'rollingSharpe': convert_series(qs.stats.rolling_sharpe(benchmark)),
            'rollingSortino': convert_series(qs.stats.rolling_sortino(benchmark)),
            'rollingVolatility': convert_series(qs.stats.rolling_volatility(benchmark)),
        }
        return_dict['benchmarkTimeseriesMetrics'] = timeseries_metrics

        # Additionally, we even need comparison metrics
        r_squared = qs.stats.r_squared(returns, benchmark)
        info_ratio = qs.stats.information_ratio(returns, benchmark)
        greeks = qs.stats.greeks(returns, benchmark)
        alpha = greeks['alpha']
        beta = greeks['beta']
        rolling_greeks = qs.stats.rolling_greeks(returns, benchmark)
        rolling_alpha = convert_series(rolling_greeks['alpha'])
        rolling_beta = convert_series(rolling_greeks['beta'])
        compare_metrics = {
            "r2": r_squared,
            "infoRatio": info_ratio,
            "alpha": alpha,
            "beta": beta
        }
        compare_timeseries_metrics = {
            "rollingAlpha": rolling_alpha,
            "rollingBeta": rolling_beta
        }
        return_dict["compareMetrics"] = compare_metrics
        return_dict["compareTimeseriesMetrics"] = compare_timeseries_metrics

    return return_dict


if __name__ == "__main__":
    if os.getenv('PORT') is not None:
        port = int(os.getenv('PORT'))
    else:
        port = 3000
    print(f'Server starting on port {port}...')
    serve(app, host='0.0.0.0', port=port)
