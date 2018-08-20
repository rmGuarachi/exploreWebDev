from flask import Flask
app = Flask(__name__)
import json

from ..database.db import get_list

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/list')
def list():
	return json.dumps(get_list())