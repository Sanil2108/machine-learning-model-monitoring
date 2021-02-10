# Different types of logs

## API Log
Format
```
{
  "type": "api",
  "data": {
    "api-endpoint": "users/",
    "ip-address": "10.10.10.10",
    "request": {
      "timestamp": 100,
      "headers": {},
      "body": {},
      "method": "POST"
    },
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
  "type": "input-output-metadata",
  "data": {
    "timestamp": 100,
    "computation-time": 10,
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