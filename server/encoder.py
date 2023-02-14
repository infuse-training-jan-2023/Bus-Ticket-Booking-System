import json
from bson import ObjectId

class Encoder(json.JSONEncoder):
    def default(self, o: any) -> any:
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(o)