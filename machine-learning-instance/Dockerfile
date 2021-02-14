FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive

RUN rm -rf ~/mlmodel
RUN mkdir -p ~/mlmodel;

WORKDIR ~/mlmodel

COPY app.py ./
COPY requirements.txt ./

RUN apt-get update;
RUN apt-get install -y python3-pip;
RUN apt-get install -y python3-flask;
RUN apt --fix-broken install
RUN apt-get install -y libgl1-mesa-glx;
RUN apt-get -y install cmake
RUN pip3 install -r requirements.txt

ENV FLASK_APP=app.py

RUN apt-get install -y libgl1-mesa-dev
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN apt-get install freeglut3-dev -y

ENV FLASK_DEBUG=False

RUN apt-get install -y python3.6

ENTRYPOINT python3 app.py