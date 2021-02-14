# Introduction

## Features in the MVP

### 1. Authentication

  This includes registering new users and adding their API keys, removing API keys of existing users and performing authentication on API keys.

### 2. Logging

  The service also logs all requests which are made along with user IP address and and some basic input metadata along with output metadata. This can be used to generate insights on Kibana.

### 3. User Feedback

  Every single user request is associated to a request id and sent to flask. The user can then rate on this request(how accurate it was or it was not)

### 4. Iterface with the machine learning model.

Send a request to the Flask application to do face recognition.


### 5. Upload the input and output images to an S3 Bucket.

These input and output images can then be associated with each individual request, and we can find out which of these images had lower confidence or took more time. Using this information, we can create more training sets based on real production data. [Right now only input images are stored]

## System Design
![System Design Diagram - https://res.cloudinary.com/dezfx8pnt/image/upload/v1613326299/system-design_tyqiaa.png](https://res.cloudinary.com/dezfx8pnt/image/upload/v1613326299/system-design_tyqiaa.png "System Design")

## How to Use?
Check out the Postman collection - https://documenter.getpostman.com/view/14555666/TWDRtzzK

## Features/Improvements planned for future
There were quite a few things I wanted to add on to the existing product, and while I have not added them in the code, I have made the system scalable to handle all these changes.

### 1. In-depth analysis

Data analysts could use Kibana to derive insights on the machine learning model performance by writing queries. For example,
1. Is the machine learning model confidence chaanging? By how much? Is it drifting with time?

2. Is the machine learning model unable to classify certain types of inputs? What are these outliers? All these inputs are already stored in S3 and associated to the data in ES.

### 2. User feedback feature

Users could respond to any output by how accurate it was. This can then tie up with the existing Active Learning approach and can be further used to generate datasets. Users could also perhaps get an email to rate their experience with the ML model.

### 3. Reports and Alerts

Data analysts could get reports for how their ML model is performing and stats such as -
1. How many requests were made to it?
2. How many people used it more than once?
3. What was the ML model's confidence?
4. Is there any correlation between confidence and any type of metadata(Is the confidence lower for low contrast images? etc.)

Apart from that, an email system can also be used to send emails if the performance of the ML model degrades beyond a certain level.