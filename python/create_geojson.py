import pymongo
import GeoTransformer

try:
   conn = pymongo.MongoClient()

   db = conn.pubs3

   twdic = db.twitter.find()
   fbdic = db.facebook.find()
   fsdic = db.foursquare.find()
   osmdic = db.osm.find()

   i=0

   for item in twdic:
       if item['coordinates'] is not None:
           if item['coordinates']['type'] == 'Point':
               d = GeoTransformer.twTransform(item)
               db.allpubs.insert(d)
           else:
               print('no point tw')

   for item in fbdic:
       if item['geo']['type'] == 'Point':
           d = GeoTransformer.fbTransform(item)
           db.allpubs.insert(d)
       else:
           print ('no point')

   for item in osmdic:
       if item['location']['type'] == 'Point':
           d = GeoTransformer.osmTransform(item)
           db.allpubs.insert(d)
       else:
           print('no point fb')

   for item in fsdic:

      d = GeoTransformer.fsTransform(item)
      db.allpubs.insert(d)


except BaseException as e:
    print(e)
    conn.close()
conn.close()

