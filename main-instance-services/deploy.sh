#!/bin/bash
ssh -i ../../aws/main-instance.pem ubuntu@3.7.206.61 "sudo apt-get update && sudo apt-get install -y docker.io && sudo apt-get install -y docker-compose"
scp -i ../../aws/main-instance.pem docker-compose.yml ubuntu@3.7.206.61:/home/ubuntu/
scp -r -i ../../aws/main-instance.pem database ubuntu@3.7.206.61:/home/ubuntu/
ssh -i ../../aws/main-instance.pem ubuntu@3.7.206.61 "cd && sudo docker-compose up -d" 