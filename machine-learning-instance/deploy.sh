#!/bin/bash
ssh -i ../../aws/main-instance.pem ubuntu@52.66.79.125 'rm -rf ~/mlmodel; mkdir -p ~/mlmodel; sudo apt-get update; sudo apt-get install -y python3-pip; sudo apt-get install -y python3-flask; sudo apt-get -y install cmake'
scp -r -i ../../aws/main-instance.pem app.py requirements.txt ubuntu@52.66.79.125:/home/ubuntu/mlmodel/
ssh -i ../../aws/main-instance.pem ubuntu@52.66.79.125 'cd ~/mlmodel; pip3 install -r requirements.txt; export FLASK_APP=app.py; flask run'