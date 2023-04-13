from blankly_external.server import Connection as __Connection
from blankly_external.reporter import Reporter as __Reporter
__connection = __Connection()
Reporter = __Reporter(__connection)
