from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Product(Base):
    __tablename__ = 'products'
    NDB_Number = Column(Integer, primary_key=True)
    long_name = Column(String(250), nullable=False)
    data_source = Column(String(250), nullable=False)
    gtin_upc = Column(String(250), nullable=False)
    manufacturer = Column(String(250))
    date_modified = Column(DateTime, default=datetime.utcnow)
    date_available = Column(DateTime, default=datetime.utcnow)
    ingredients_english = Column(Text)

    @property
    def serialize(self):
        return dict(
            NDB_Number=self.NDB_Number,
            long_name=self.long_name,
            data_source=self.data_source,
            gtin_upc=self.gtin_upc,
            manufacturer=self.manufacturer,
            date_modified=self.date_modified,
            date_available=self.date_available,
            ingredients_english=self.ingredients_english
        )



# Create an engine that stores data in the local directory's
# app.db file.
engine = create_engine('sqlite:///app.db')

# Create all tables in the engine. This is equivalent to "Create Table"
# statements in raw SQL.
Base.metadata.create_all(engine)
