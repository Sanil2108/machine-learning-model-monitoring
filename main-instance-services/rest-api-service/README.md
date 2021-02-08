# Introduction

This REST API provides the following functionalities
1. Authentication
  This includes registering new users and adding their API keys, removing API keys of existing users and performing authentication on API keys.

2. Logging
  The service also logs all requests which are made along with user IP address and and some basic input metadata along with output metadata. This can be used to generate insights on Kibana.

3. User Feedback
  Every single user request is associated to a request id and sent to flask. The user can then rate on this request(how accurate it was or it was not)

4. Iterface with the machine learning model. Send a request to the Flask application to do face recognition.

5. Send an asynchronous request to the monitoring flow.

6. Upload the attachment to an S3 Bucket.