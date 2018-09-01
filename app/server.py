from flask import Flask, jsonify
from sqlalchemy.orm import sessionmaker

from models import Base, Product, engine


app = Flask(__name__)
Base.metadata.bind = engine
dbsession = sessionmaker(bind=engine)
session = dbsession()


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add(
        'Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add(
        'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/list')
def get_list():
    products = session.query(Product).slice(0, 10)
    return jsonify([i.serialize for i in products])


if __name__ == '__main__':
    app.run()
