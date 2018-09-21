from itertools import chain
from multiprocessing import Pool

import pandas as pd
from sqlalchemy.orm import sessionmaker

from models import Base, engine, SubwayStation, SubwayLine


def get_lat_lon(latlong):
    l = latlong.split('(')[1].split(" ")
    return float(l[0]), float(l[1].split(')')[0])

def get_subway_station_info(row):
    lon, lat = get_lat_lon(row['the_geom'])
    return {
        'name': row['NAME'],
        'trains': row['LINE'].split('-')[:-1] or [row['LINE']],
        'lat' : lat,
        'lon': lon
    }


def create_db():
    # TODO fix populatedb some stations are not being added eg. R line
    df = pd.read_csv('dataset/mta_subway_station.csv')
    # create transcompany
    train_station = []
    train_lines = []
    stations  = df.iterrows()
    for index, row in df.iterrows():
        info = get_subway_station_info(row)
        cStation = SubwayStation(name=info['name'], lat=info['lat'], lon=info['lon'])
        for t in info['trains']:
            add = True
            c = SubwayLine(id=t)
            for line in train_lines:
                if line.id == t:
                    print(t , line.id)
                    c = line
                    add = False
                    break
            cStation.lines.append(c)
            if add:
                train_lines.append(c)
                session.add(c)
        session.add(cStation)
    print("here")
    session.commit()



if __name__ == '__main__':
    Base.metadata.bind = engine
    dbsession = sessionmaker(bind=engine)
    session = dbsession()
    me = SubwayStation(name="me", lat=2.3, lon=2.3)
    me.lines.append(SubwayLine(id='me'))
    session.add(me)
    create_db()    
