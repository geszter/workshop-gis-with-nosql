from django.shortcuts import render
import pymongo
import json
from bson import json_util
# Create your views here.
def mapping(request):
    #Connecting to MongoDB
    db = pymongo.MongoClient().pubs
	
	#coordinates of the conference location
    longitude = 24.9495854
    latitude = 60.1694509
    coord = [ longitude , latitude ]
	
    #Reading the data from MongoDB

    Data_ptr_tw = db.allpubs.find({'$and': [{'properties.user': { '$exists': True}} ]}, {'geometry.coordinates': 1, '_id': 0, 'properties.user': 1 })
    Data_ptr_fb = db.allpubs.find({'properties.category_list': { '$exists': True}}, {'geometry.coordinates': 1, 'properties.name':1})
	#Data_ptr_fb = db.allpubs.find({'$and': [{'properties.category_list': { '$exists': True}}, ]}, {'geometry.coordinates': 1, '_id': 0, 'properties.category': 1, 'properties.name':1, 'properties': 1})
    Data_ptr_fs = db.allpubs.find({'$and': [{'properties.rating': { '$exists': True}},]}, {'geometry.coordinates': 1, '_id': 0, 'properties.name': 1, 'properties': 1})
    Data_ptr_osm = db.allpubs.find({'$and': [{'properties.amenity': { '$exists': True}}, {'geometry': { '$near' : { '$geometry': {'type': "Point" , 'coordinates':  coord} , '$maxDistance': 500 }}}]}, {'geometry.coordinates': 1, '_id': 0, 'properties.name': 1, 'properties': 1})
    Data_ptr_allpubs = db.allpubs.find({'geometry': { '$near' : { '$geometry': {'type': "Point" , 'coordinates':  coord} , '$maxDistance': 1000 }}}, {'geometry.coordinates': 1})
    Data_ptr_smallarea = db.smallarea.find({'properties.tweet_count': { '$exists': True}}, {'geometry.coordinates': 1, '_id': 0, 'properties.name': 1, 'properties.tweet_count': 1})

    docs_tw = []
    #Transformation of the single documents to a JSON-List
    for doc in Data_ptr_tw:
        doc_j = json.dumps(doc, default=json_util.default)
        docs_tw.append(doc_j)

    docs_fb =[]
    for doc in Data_ptr_fb:
            doc_j = json.dumps(doc, default=json_util.default)
            docs_fb.append(doc_j)
	
    docs_fs =[]
    for doc in Data_ptr_fs:
            doc_j = json.dumps(doc, default=json_util.default)
            docs_fs.append(doc_j)

			
    docs_osm =[]
    for doc in Data_ptr_osm:
            doc_j = json.dumps(doc, default=json_util.default)
            docs_osm.append(doc_j)
	
    docs_allpubs =[]
    for doc in Data_ptr_allpubs:
            doc_j = json.dumps(doc, default=json_util.default)
            docs_allpubs.append(doc_j)
			
    docs_smallarea =[]
    for doc in Data_ptr_smallarea:
            doc_j = json.dumps(doc, default=json_util.default)
            docs_smallarea.append(doc_j)

# Shows the header.html and sends the JSON-List as 'mdb_data'
    return render(request, 'mapsite/header.html', { 'mdb_Data_tw': docs_tw, 'mdb_Data_fb': docs_fb, 'mdb_Data_fs' : docs_fs, 'mdb_Data_osm': docs_osm, 'mdb_Data_allpubs':docs_allpubs, 'mdb_Data_smallarea':docs_smallarea })

#, 'mdb_Data_tw': docs_tw, 'mdb_Data_allpubs':docs_allpubs, 'mdb_Data_fb': docs_fb,

