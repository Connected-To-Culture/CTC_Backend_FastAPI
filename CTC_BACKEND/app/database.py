from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import  sessionmaker

import psycopg2;
from psycopg2.extras import  RealDictCursor;
import time;
from .config import settings


#SQLALCHEMEY_DATABASE_URL =  "postgresql://postgres:postgres@localhost/CTC_Market"
SQLALCHEMEY_DATABASE_URL =  f'postgresql://{settings.
database_username}:{settings.database_password}@{settings.database_hostname}/{settings.database_name}'
#SQLALCHEMY_DATABASE_URL = f'postgresql+psycopg2://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'

engine = create_engine(SQLALCHEMEY_DATABASE_URL)

# we want to make use of a session when we actaully want to talk to the database

SesionLocal = sessionmaker(autocommit = False, autoflush=False, bind= engine)

Base = declarative_base()

#Create the following dependency which opens up a new session upon connection to the 
# database whenever we get a request and close the db when the query is done
# we can keep calling this function whenever we get a request to any of our API endpoints

 
def get_db() :
  db = SesionLocal()
  try :
    yield db
  finally :
    db.close()

# while True:
#     try:
#           connection = psycopg2.connect(
#           host="localhost",
#           database="CTC_Market",
#           user="postgres",
#           password="postgres",
#           port="5432",
#           cursor_factory=RealDictCursor
#            )
#           print("Connection to PostgreSQL database successful")
#           cursor = connection.cursor()
#           break
          
#     except psycopg2.Error as error:
#         print(f"Error while connecting to PostgreSQL: {error}")
#         time.sleep(5)  # Wait for 5 seconds before retrying

