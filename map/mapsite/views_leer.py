from django.shortcuts import render
import pymongo
import json
from bson import json_util
# Create your views here.
def mapping(request):
    #Connecting to MongoDB
 
	
	#coordinates of the conference location
    longitude = 24.9495854
    latitude = 60.1694509
    coord = [ longitude , latitude ]
	
    #Reading the data from MongoDB


    #Transformation of the single documents to a JSON-List


# Shows the header.html and sends the JSON-List as 'mdb_data'
    return render(request, 'mapsite/header.html', { })



