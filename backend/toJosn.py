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
        result = []
        for item in target_list:
            jsondata = JSONHelper.to_json(item)
            result.append(jsondata)
        print(result)
        return result
        
    