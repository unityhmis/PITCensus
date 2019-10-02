#!/usr/bin/env python
# A function decorator to require auth on Flask pages
# See here: http://flask.pocoo.org/snippets/8/
# http://thecodeship.com/patterns/guide-to-python-function-decorators/
from functools import wraps
from flask import Response, request

def webpageNotAuthorized():
    #Sends a 401 response that enables basic auth
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def endpointNotAuthorized():
    #Sends a 401 response that enables api endpoint authentication
    return Response(
    'Could not verify your access level for the REST API.\n'
    'Please supply the required API key with the x-api-key request header.', 401)

# Verifies that a webpage requires an HTTP Basic Auth username and password
# or else a 401 response is returned.
def requires_auth(username, password):
    def auth_decorator(func):
        @wraps(func)
        def func_wrapper(*flask_args, **flask_kwargs):
            auth = request.authorization
            if not auth or (auth.username != username) or (auth.password != password):
                return webpageNotAuthorized()
            return func(*flask_args, **flask_kwargs)
        return func_wrapper
    return auth_decorator

# Verifies an API endpoint has an API key as a request parameter
# or else a 401 response is returned.
def requires_api_key(key):
    def api_key_decorator(func):
        @wraps(func)
        def func_wrapper(*flask_args, **flask_kwargs):
            clientKey = request.headers.get('x-api-key')
            if not clientKey or (clientKey != key):
                return endpointNotAuthorized()
            return func(*flask_args, **flask_kwargs)
        return func_wrapper
    return api_key_decorator
