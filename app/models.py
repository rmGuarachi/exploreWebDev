from datetime import datetime

from sqlalchemy import (Table, Column, Integer, String, DateTime, Text, create_engine, 
    ForeignKey, Float)
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


subway = Table('subway', Base.metadata,
    Column('station', String(250), ForeignKey('subway_station.id')),
    Column('line', String(1), ForeignKey('subway_line.id'))
)

class SubwayStation(Base):
    __tablename__ = 'subway_station'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(250))
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    lines = relationship(
        'SubwayLine',
        secondary=subway,
        backref='stations'
        )
    

class SubwayLine(Base):
    __tablename__ = 'subway_line'
    id = Column(String, primary_key=True)
    color = Column(String(250))


# Create an engine that stores data in the local directory's
# app.db file.
engine = create_engine('sqlite:///app.db')

# Create all tables in the engine. This is equivalent to "Create Table"
# statements in raw SQL.
Base.metadata.create_all(engine)
