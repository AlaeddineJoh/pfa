from pymongo import MongoClient
import pandas as pd
import io
import requests
import json


def datainsert():
    connection = MongoClient('localhost', 27017)
    if 'covid' in connection.list_database_names():
        connection.drop_database('covid')
    database = connection['covid']

    url = "https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv"
    read_data = requests.get(url).content

    data = pd.read_csv(io.StringIO(read_data.decode('utf-8')))

    url2 = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv"
    read_data = requests.get(url2).content

    data2 = pd.read_csv(io.StringIO(read_data.decode('utf-8')))

    data['percentage of death'] = (data['Deaths'] * 100) / data['Confirmed']
    data['percentage of death'] = data['percentage of death'].fillna(0)

    data['percentage of recovered'] = (data['Recovered'] * 100) / data['Confirmed']
    data['percentage of recovered'] = data['percentage of recovered'].fillna(0)

    data['Active Cases'] = data['Confirmed'] - data['Recovered'] - data['Deaths']
    data['percentage of Active case'] = data['Active Cases'] * 100 / data['Confirmed']

    data['percentage of Active case'] = data['Active Cases'].fillna(0)

    df = data
    df.isnull().sum()

    l = ['continent', 'location', 'date', 'total_cases', 'total_tests', 'population']

    df2 = data2[l]

    l = df2['location'].unique().tolist()

    l1 = df['Country'].unique().tolist()

    l3 = []
    for i in l:
        if i not in l1:
            l3.append(i)

    df2 = df2.set_index("location")
    for i in l3:
        df2 = df2.drop(i, axis=0)

    df2 = df2.reset_index()

    l3 = []
    for i in l1:
        if i not in l:
            l3.append(i)

    df = df.set_index("Country")
    for i in l3:
        df = df.drop(i, axis=0)

    df = df.reset_index()

    l1 = df["Date"].unique().tolist()
    l = df2["date"].unique().tolist()

    l3 = []
    for i in l:
        if i not in l1:
            l3.append(i)
    len(l3)

    df2 = df2.set_index("date")

    for i in l3:
        df2 = df2.drop(i, axis=0)
    data2 = data2.reset_index()

    l3 = []
    for i in l1:
        if i not in l:
            l3.append(i)
    len(l3)

    l1 = df['Country'].unique().tolist()
    collection = database['DATA']
    for i in l1:
        filt = df['Country'] == i
        filt2 = df2['location'] == i
        df_inter = df.loc[filt]
        df2_inter = df2.loc[filt2]
        df_inter['population'] =  df2_inter['population'].values[0]
        result = df_inter.to_json(orient='index')
        parsed = json.loads(result)
        for j in parsed:
            collection.insert_one(parsed[j])

    url3 = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv'
    read_data = requests.get(url3).content
    world = pd.read_csv(io.StringIO(read_data.decode('utf-8')), error_bad_lines=False)

    result = world.to_json(orient='index')
    parsed = json.loads(result)
    collection2 = database['World']
    for j in parsed:
        collection2.insert_one(parsed[j])
