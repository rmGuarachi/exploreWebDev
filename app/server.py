from flask import Flask, jsonify
from sqlalchemy.orm import sessionmaker

from models import Base, engine, SubwayStation, SubwayLine



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
    # TODO temp fix for issues with sqlite thread issues
    dbsession = sessionmaker(bind=engine)
    session = dbsession()
    stations = session.query(SubwayStation).all()
    return jsonify([i.serialize for i in stations])


@app.route('/list/source/<subway_line>')
def get_line_stations(subway_line):
    dbsession = sessionmaker(bind=engine)
    session = dbsession()
    stations = session.query(SubwayLine).all()
    if not stations:
        return '{}'
    db = dict(
            type="FeatureCollection",
            features=stations[1].to_geojson
        )
    return jsonify(db)


@app.route('/update/station/<lat>/<lon>')
def update_station(lat, lon):
    return jsonify([lat, lon])

@app.route('/update/train/<id>')
def update_train_line(id):
    return id


if __name__ == '__main__':
    app.run()
