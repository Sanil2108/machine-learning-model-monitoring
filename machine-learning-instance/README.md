# Introduction

A simple Flask application that defines a single API endpoint, `predict` which takes in an image and returns coordinates of faces in the image.

# Installation

Note: The package `python3-flask` should be installed on the OS for it to run properly.

`pip3 install -r requirements.txt`

`export FLASK_APP = app.py`

`flask run`

# API Doc

Endpoint: `predict`

Request Body: 
```
{
  "url": ""
}
```

Response codes:
`200`, `400`

Response Body:
```
faceLocationRectangles: [
  {
    "bottom": 115,
    "left": 315,
    "right": 377,
    "top": 53
  },
]
```