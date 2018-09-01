from itertools import chain
from multiprocessing import Pool

import pandas as pd
from sqlalchemy.orm import sessionmaker

from models import Base, Product, engine


def add_product(df_slice):
    return [Product(**dict(p[1])) for p in df_slice.iterrows()]


def create_db():
    products = pd.read_csv('dataset/products.csv', parse_dates=[5, 6])

    l = len(products)
    lists = [
        products[:int(l / 4)],
        products[int(l / 4): int(l / 2)],
        products[int(l / 2): int((3 * l) / 4)],
        products[int((3 * l) / 4):]
    ]
    with Pool(4) as p:
        print('start')
        products = chain(*p.map(add_product, lists))
        print('finished')
        session.add_all(products)
        # for product in products:
            # print(product)
            # session.add(product)
        session.commit()


if __name__ == '__main__':
    Base.metadata.bind = engine
    dbsession = sessionmaker(bind=engine)
    session = dbsession()
    create_db()
