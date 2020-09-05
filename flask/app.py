from flask import Flask, jsonify

from flask_pymongo import PyMongo
from DataInsert import datainsert
from flask_cors import cross_origin
import datetime

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'covid'
app.config["MONGO_URI"] = "mongodb://localhost:27017/covid"
mongo = PyMongo(app)

now = datetime.datetime.now()
current_time = now.strftime("%H:%M:%S")


@app.route('/', methods=['GET'])
@cross_origin()
def index():
    if current_time == "00:00:00":
        datainsert()
    name = mongo.db.World.find({})
    countries = mongo.db.DATA.find({})
    Country_list = []
    for i in countries:
        if i['Country'] not in Country_list:
            Country_list.append(i['Country'])
    IncreaseRate = []
    confirmed = []
    deaths = list()
    recovered = list()
    date= list()

    for q in name:
        IncreaseRate.append(q['Increase rate'])
        confirmed.append(q['Confirmed'])
        deaths.append(q['Deaths'])
        recovered.append(q['Recovered'])
        date.append(q['Date'])

    last_day_values = [{'Confirmed': confirmed[-1]},
                       {'Deaths': deaths[-1]},
                       {'Recoverd': recovered[-1]}]

    return (jsonify({'Country_list': Country_list,
                    'date':date ,
                    'last_day_values': last_day_values,
                    'IncreaseRate': IncreaseRate}))

@app.route('/map', methods=['GET'])
@cross_origin()
def map():
    countries = mongo.db.DATA.find({})
    Country_list = []
    for i in countries:
        if i['Country'] not in Country_list:
            Country_list.append(i['Country'])
    map_data = list ()
    for i in Country_list:
        l = []
        q = mongo.db.DATA.find({'Country': i})
        for j in q:
            l.append(j["Confirmed"])
        map_data.append({i: l[-1]})\

    map_info =jsonify({'map': map_data})
    return map_info

@app.route('/<Country>/', methods=['GET'])
@cross_origin()
def hello_world(Country):
    name = mongo.db.DATA.find({'Country': Country})
    confirmed = []
    deaths = []
    active = []
    recovered = []
    p_deaths = list()
    p_recovered = []
    population = 0
    date=list()
    for i in name:
        date.append( i['Date'])
        active.append( i['Active Cases'])
        deaths.append(i['Deaths'])
        confirmed.append( i['Confirmed'])
        recovered.append(i['Recovered'])
        p_deaths.append(i['percentage of death'])
        p_recovered.append(i['percentage of recovered'])
        population = i['population']
    last_day_values = {'pourcenttage of deaths': p_deaths[-1],
                       'pourcenttage of recovered': p_recovered[-1],
                       'pourcenttage of active cases': 100 - (p_deaths[-1] + p_recovered[-1]),
                       'population' : population,
                       'Confirmed': confirmed[-1],
                       'Recovered': recovered[-1],
                       'Deaths': deaths[-1]
                       }
    output = jsonify({'confirmed': confirmed, 'Deaths': deaths,
                      'last_day_values': last_day_values,
                      'Active': active, 'recovered': recovered, 'Date': date})

    return output


if __name__ == '__main__':
    app.run(debug=True)
