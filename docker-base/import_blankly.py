"""
Any unit tests can be configured here to ensure that each version runs
"""

import blankly

print("Deployed:")
try:
    assert blankly.is_deployed
except AssertionError:
    raise AssertionError('blankly.is_deployed returned False indicating an issue locating the package')
