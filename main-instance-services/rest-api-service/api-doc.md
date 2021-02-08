# API Documentation
This highlights the REST APIs that this service provides.

## Authentication

### Registering a new user


METHOD: POST

URL:
${BASE_URL}/users/

Request
```
{
  "email": "sanilkhurana7@gmail.com",
  "password": "root"
}
```

Response codes

201, 400

Response Data

```
{
  message?: ''
}
```

### Deleting a user


METHOD: DELETE

URL:
${BASE_URL}/users/

Request
```
{}
```

Headers

Authorization: `Basic btoa(`${email}:${password}`)`

Response codes

200, 400, 404

Response Data

```
{
  message?: ''
}
```

### Creating an API key


METHOD: POST

URL:
${BASE_URL}/apikey/

Request
```
{}
```

Headers

Authorization: `Basic btoa(`${email}:${password}`)`

Response codes

200, 400, 404

Response Data

```
{
  apiKey: '',
  message?: ''
}
```

### Invalidating an API key

METHOD: POST

URL:
${BASE_URL}/apikey/remove

Request
```
{
  apiKey: ''
}
```

Headers

Authorization: `Basic btoa(`${email}:${password}`)`

Response codes

200, 400, 404

Response Data

```
{
  message?: ''
}
```

## Model Prediction

### Predict


METHOD: POST

URL:
${BASE_URL}/predict

Request
```
{
  image: `btoa(image)`
}
```

Headers

Authorization: `Token ${apiKey}`)`

Response codes

200, 400, 404

Response Data

```
{
  message?: ''
}
```