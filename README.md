# workshop-gis-with-nosql

To work locally at the hands-on session you have to install a couple of things:    
1. MongoDB: https://www.mongodb.com/download-center?jmp=nav#community (choose one according to your operating system, SSL is not necessary)    
  if possible, install it to C:\MongoDB     
  create a new folder: C:\data\db    
2. Python3: https://www.python.org/downloads/    
  if possible, install it to C:\python3x      
  during install make sure that you add python to the path    
3. install pymongo, django and simplejson with pip      
  open a command line and type:    
  >pip install django    
  >pip install simplejson     
  >pip install pymongo     

(4. optional: install PyCharm (Python IDE) : https://www.jetbrains.com/pycharm/ )    
5. load the database dump 'pubs' to MongoDB    
   download the dbdump/pubs folder to C:\data\dumps    
   type the following in a command line:    
    C:\MongoDB\Server\3.2\bin>mongorestore -d pubs C:\data\pubs         
6. download the django project to C:\django

## Vagrant

If you use [Vagrant](https://www.vagrantup.com), you can also:

* Run `vagrant up` in the repository.

* Connect to the vagrant virtual machine with `vagrant ssh`.

* To run the django application:

    * Execute `cd /vagrant/map && python3 manage.py runserver 0.0.0.0:8000` inside the virtual machine.

    * Visit `http://localhost:8000` in your browser.
