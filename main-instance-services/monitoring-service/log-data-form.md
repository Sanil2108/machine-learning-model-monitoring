# Different types of logs

## API Reqeust Log
Format
```
{
  "type": "api-request",
  "data": {
    "api-endpoint": "users/",
    "ip-address": "10.10.10.10",
    "request-uuid": "",
    "request": {
      "timestamp": 100,
      "headers": {},
      "body": {},
      "method": "POST"
    }
  }
}
```

## API Response Log
Format
```
{
  "type": "api-response",
  "data": {
    "api-endpoint": "users/",
    "ip-address": "10.10.10.10",
    "request-uuid": "",
    "response": {
      "timestamp": 100,
      "status": 200,
      "data": {}
    }
  }
}
```

## Input and output metadata log
Format
```
{
  "type": "prediction-data",
  "data": {
    "timestamp": 100,
    "computation-time": 10,
    "api-key": 11,
    "input-metadata": {
      "height": 100,
      "width": 100,
      "contrast": 1
    },
    "output-metadata": {
      "confidence": 1
    }
  }
}
```