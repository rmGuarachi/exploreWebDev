import csv, sqlite3
import os

db = "products.db"
cwd = os.path.dirname(os.path.realpath(__file__))
path_db = os.path.join(cwd, db)

def create_db():
    con = sqlite3.connect(path_db)
    cur = con.cursor()
    cur.executescript("""
	        DROP TABLE IF EXISTS products;
	        CREATE TABLE products (NDB_Number,long_name,data_source,gtin_upc,manufacturer,date_modified,date_available,ingredients_english);""")
    with open('products.csv','rt') as fin:
        dr = csv.DictReader(fin) # comma is default delimiter
        to_db = [( i['NDB_Number'], i['long_name'], i['data_source'], i['gtin_upc'], i['manufacturer'], i['date_modified'], i['date_available'], i['ingredients_english']) for i in dr]

    cur.executemany("INSERT INTO products (NDB_Number,long_name,data_source,gtin_upc,manufacturer,date_modified,date_available,ingredients_english) VALUES (?, ?, ?, ?, ? ,?, ?, ?);", to_db)
    con.commit()
    con.close()


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
 

def get_list():
    print("THIS IS THE PATH" + path_db)
    connection = sqlite3.connect(path_db)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("select * from products limit 1000")
    results = cursor.fetchall()
    connection.close()
    return results


if __name__ == '__main__':
    create_db();