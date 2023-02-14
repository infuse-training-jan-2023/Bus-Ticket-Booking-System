from flask import Blueprint, Response, request
from models.bus import Bus
from encoder import Encoder
import json
part_bus = Blueprint('part_bus', __name__)

bus = Bus()

#search buses
@part_bus.route('/bus_search', methods = ['POST'])
def filter_search():
    request_data = request.get_json()
    buses = bus.filter_search(request_data)
    if buses == {}:
        return Response({"Error": "No buses found for given data"}, mimetype="application/json", status=400)
    json_data = Encoder().encode(list(buses))
    return Response(json_data, mimetype="application/json", status=200)

#view user buses
@part_bus.route('/bus', methods = ['GET'])
def find_user_buses():
    bus_id = request.args.get("bus_id")
    day = request.args.get("day")
    buses = bus.find_user_buses(bus_id, day)
    if buses == {}:
        return Response(json.dumps({"Error": "No buses found"}), mimetype="application/json", status=401)
    json_data = Encoder().encode(buses)
    return Response(json_data, mimetype="application/json", status=201)

#view buses
@part_bus.route('/buses', methods = ['GET'])
def find_all_buses():
    buses = bus.find_all_buses()
    if len(buses) == 0:
        return Response(json.dumps({"Error": "No buses found"}), mimetype="application/json", status=401)
    json_data = Encoder().encode(buses)
    return Response(json_data, mimetype="application/json", status=201)

# find a bus
@part_bus.route('/bus/<string:bus_id>', methods = ['GET'])
def find_a_bus(bus_id):
    get_bus = bus.find_a_bus(bus_id)
    if get_bus == {}:
        return Response({"Error": "Failed to find the bus"}, mimetype="application/json", status=404)
    json_data = Encoder().encode(get_bus)
    return Response(json_data, mimetype="application/json", status=200)

# delete bus
@part_bus.route('/bus/<string:bus_id>', methods = ['DELETE'])
def delete_bus(bus_id):
    stat = bus.delete_bus(bus_id)
    if stat == {}:
        return Response({"Error": "Failed to delete the bus"}, mimetype="application/json", status=401)
    return Response(json.dumps(stat), mimetype="application/json", status=201)