# tradeBinder

Basic Setup Information
This application requires Node, NodeJS, MongoDB, and Express. 
Node v4.2.6 LTS: https://nodejs.org/en/
NodeJS: I installed via apt-get. apt-get nodejs
Express via npm: $ npm install express --save
MongoDB Drivers via npm: $ npm install mongodb --save

Run the following command from the checkout directory in the terminal
to start the server: $ node server.js
Then navigate to http://localhost:18080/

To install MongoDB for Linux...:
https://docs.mongodb.org/v2.6/tutorial/install-mongodb-on-ubuntu/#install-mongodb
More good info about Mongo:
http://theholmesoffice.com/how-to-create-a-mongodb-database/

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo apt-get install -y --force-yes mongodb-org=2.6.9 mongodb-org-server=2.6.9 mongodb-org-shell=2.6.9 mongodb-org-mongos=2.6.9 mongodb-org-tools=2.6.9
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

If you have trouble running 'mongod' and get this error: dbpath (/data/db) 
does not exist. Try these commands.
sudo mkdir -p /data/db/
sudo chown `id -u` /data/db


Start MongoDB:
sudo service mongod start

Stop MongoDB:
sudo service mongod stop

Restart MongoDB:
sudo service mongod restart

To run MongoDB commands start the shell with:
mongo

For our mongodb.js example:
start the mongodb server
type: 'mongo'
> use users
> db.users.save({user: "leeroy", jwt: "asaalsjkdghfkajsgdu8734jhg54"})
'ctrl + c' to exit

node mongodb.js

Should return your user.



#########################
Running Jasmine Tests with Karma
I'm not entirely sure what is needed, but I tried 1000 ways and this finally worked
Run these commands from the checkout directory
$ npm install karma --save-dev
$ npm install karma-phantomjs-launcher --save-dev
$ npm install karma-jasmine --save-dev

Install bower
$ npm install -g --save bower

Get the libs you want/need. Our libs folder currently has everything, but we need
to switch to bower.

$ bower install angular
$ bower install angular-mocks
etc.


Everything is controlled through karma.conf.js 
To run jasmine tests just navigate to the checkout directory and run
$ karma start