from json import dumps
from datetime import date, datetime

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def serialize(model):
    from sqlalchemy.orm import class_mapper
    columns = [c.key for c in class_mapper(model.__class__).columns]
    return dict((c, getattr(model, c)) for c in columns)

class JSONHelper():
    @staticmethod
    def model_to_json(item):
        item_dict = serialize(item)
        return item_dict

    @staticmethod
    def to_json(item):
        jsondata = {}
        for k, v in vars(item).items():
            if k != '_sa_instance_state':
                tdic = {
                    k: v
                }
                jsondata.update(tdic)
        return jsondata
        
    @staticmethod
    def to_json_list(target_list):
        if len(target_list) == 0:
            return []
        result = []
        for item in target_list:
            jsondata = JSONHelper.to_json(item)
            result.append(jsondata)
        print(result)
        return result

    @staticmethod
    def datetime_to_json(date):
        return dumps(date, default=json_serial)
    