# Introduction

The web application takes image as an input, which is fed in a face detection machine learning model and sends back output.

Postman Collection - https://documenter.getpostman.com/view/14555666/TWDRrePS

System Design - https://drive.google.com/file/d/1ujkk5ePO67zKe_IFA8Zvk5sY448hac7C/view?usp=sharing

## Features

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

### Daily, Weekly, Monthly report generation
Amazon SES can be used to email reports based on data that is logged into ES.
**This is a planned feature that the current architecture supports but is not complete**

### Asking the user for feedback and generating insights
**This is a planned feature that the current architecture supports but is not complete**
The user can give feedback on response from the service(whether it was correct or not). This can be helpful when creating new training set for the ML model.
