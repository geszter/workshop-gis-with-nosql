
import json
import pymongo

conn = pymongo.MongoClient()
db = conn.pubs
longitude = 24.9495854
latitude = 60.1694509
coord = [longitude, latitude]
allpubs_near = db.allpubs.find({'geometry': { '$near' : { '$geometry': {'type': "Point" , 'coordinates':  [24.9495854, 60.1694509]} , '$maxDistance': 500 }}})
for pub in allpubs_near:
     db.smallarea.insert(pub)
db.smallarea.ensure_index([("geometry", pymongo.GEOSPHERE)])


pubs = db.smallarea.find({'properties.user': { '$exists': False }})
for pub in pubs:
    tweetcount = db.smallarea.count({'$and': [
        {'properties.user': { '$exists': True}},
        {"geometry": {"$near":
                            {"$geometry": {
                                "type": "Point" ,
                                "coordinates": [ pub['geometry']['coordinates'][0] , pub['geometry']['coordinates'][1]  ]
                                },
                             "$maxDistance": 50,
                             "$minDistance": 0
                            }
                        }
        }
    ]})
    db.smallarea.update({'_id' : pub['_id']},{"$set": {'properties.tweet_count': tweetcount}}, upsert=False)




conn.close()