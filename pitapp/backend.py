#!/usr/bin/env python
import flask
import sys
import json
import os
import database
from database import MongoDatabase
from config import PitConfig
from routes import PitRoutes

reload(sys)
sys.setdefaultencoding('utf8')

# ---------------------------------------------------------------------------- #
# Create Flask web application object.
pit_app = flask.Flask(__name__, static_url_path="")
pit_app.secret_key = "roflmao"

# Set up and verify database connection.
database = MongoDatabase(PitConfig)
database.connect()

# Set up API endpoints.
routes = PitRoutes(
    pit_app,
    database,
    PitConfig,
    flask.make_response,
    flask.render_template)

if __name__ == "__main__":
    # Start application.
    debug = PitConfig['web']['debug'] == 'True'
    port = int(PitConfig['web']['port'])
    if debug:
        pit_app.run(debug=debug, host="0.0.0.0", port=port)
    else:
        context = ('fullchain.pem', 'privkey.pem')
        pit_app.run(debug=debug, host="0.0.0.0", port=port, ssl_context=context)
