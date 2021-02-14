from flask import Flask, request, abort

import face_recognition
import requests
import uuid
import os
import random

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
  if 'url' not in request.json or 'requestUUID' not in request.json:
    abort(400)

  # Get the image URL from the request object
  image_url = request.json['url']

  # Store the image locally
  name_of_image = str(uuid.uuid4())+'.png'
  response = requests.get(image_url)
  file = open(name_of_image, 'wb')
  file.write(response.content)
  file.close()

  # Find the faces in the image
  image = face_recognition.load_image_file(name_of_image)
  face_locations = face_recognition.face_locations(image)

  # Format the output
  rectangles = []
  for face_location in face_locations:
    top, right, bottom, left = face_location
    rectangles.append({
      'top': top,
      'right': right,
      'bottom': bottom,
      'left': left
    })

  # Remove the locally saved image
  os.remove(name_of_image)

  # Return all the faces found in JSON
  return {
    'faceLocationRectangles': rectangles,
    'confidence': random.uniform(0, 1),
    'requestUUID': request.json['requestUUID']
  }

if __name__ == "__main__":
    app.run(host='0.0.0.0')