# Introduction

The web application takes image as an input, which is fed in a face detection machine learning model and sends back output.


## Features in the MVP

### Authentication
This step provides a service for registering new users and sending them an API key, and logging in users with the said API key. Users can delete their accounts and invalidate API keys.

### Logging input and output for creating future training dataset for active learning
All input is stored in S3 to create future training datasets. Information for all the inputs can be accessed from ES.
In future, a feedback feature can be added so that users can respond whether the prediction was accurate or not as well which would help in making this dataset.

### Logging image data to generate insights
Image data, such as image metadata(width of image, height of image, brightness, etc.) can be stored in ES to generate insights on the type of inputs that the ML model receives and appropriately plan future training and updates. Please note that this feature is still in development.

### Logging output data to generate insights
Output data such as confidence can be used to generate insights on how the ML model is performing.

### Logging user behaviour to generate insights
User behaviour such as API key generation, invalidating API keys, signing up, etc. is logged to generate insights on how users use the service.

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