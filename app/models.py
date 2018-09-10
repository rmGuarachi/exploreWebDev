from datetime import datetime
from sqlalchemy import (Table, Column, Integer, String, DateTime, Text, create_engine, 
    ForeignKey, Float, ForeignKeyConstraint)
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


subway = Table('subway', Base.metadata,
    Column('line', String, ForeignKey('subway_line.id')),
    Column('lat', Float),
    Column('lon', Float),
    ForeignKeyConstraint(['lat', 'lon'], ['subway_station.lat', 'subway_station.lon'])

)

class SubwayStation(Base):
    __tablename__ = 'subway_station'
    name = Column(String(100), nullable=False)
    lat = Column(Float, primary_key=True,)
    lon = Column(Float, primary_key=True,)
    lines = relationship(
        'SubwayLine',
        secondary=subway,
        backref='stations'
        )

    @property
    def serialize(self):
        return dict(
            name = self.name,
            lat = self.lat,
            lon = self.lon,
            lines = [i.serialize for i in self.lines]
        )    

class SubwayLine(Base):
    __tablename__ = 'subway_line'
    id = Column(String, primary_key=True)
    color = Column(String(250))

    @property
    def serialize(self):
        return dict(
            id = self.id,
            color = self.color or ""
        )
    


# Create an engine that stores data in the local directory's
# app.db file.
engine = create_engine('sqlite:///app.db')

# Create all tables in the engine. This is equivalent to "Create Table"
# statements in raw SQL.
Base.metadata.create_all(engine)
