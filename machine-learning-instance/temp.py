import face_recognition
import requests
import uuid
import cv2
import os

url = "https://www.mbarendezvous.com/images/top-stories-img/bannerimage_1527249598.jpg"

name_of_image = str(uuid.uuid4())+'.png'

response = requests.get(url)
file = open(name_of_image, 'wb')
file.write(response.content)
file.close()

image = face_recognition.load_image_file(name_of_image)
face_locations = face_recognition.face_locations(image)

img = cv2.imread(name_of_image, cv2.IMREAD_COLOR)


for i in range(0, len(face_locations)):
  face_location = face_locations[i]
  top, right, bottom, left = face_location
  img = cv2.rectangle(image, (left, top), (right, bottom), (255, 0, 0), 2)

cv2.imshow("Cute Kitens", img)


cv2.waitKey(0)



print(face_locations)

os.remove(name_of_image)