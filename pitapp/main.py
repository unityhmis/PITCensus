# Provides a WSGI entrypoint for the application
from backend import pit_app

if __name__ == "__main__":
    pit_app.run()