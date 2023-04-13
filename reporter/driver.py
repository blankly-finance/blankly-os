from blankly_external import Reporter as reporter
import time


if __name__ == "__main__":
    start = 5.0
    other_var = 0.0
    reporter.export_live_var(start, 'start_var', description='welcome to my wild world')
    reporter.export_live_var(other_var, 'big_var', )

    while True:
        time.sleep(1)
        print(reporter.update_live_var(start))
        print(reporter.update_live_var(other_var))
