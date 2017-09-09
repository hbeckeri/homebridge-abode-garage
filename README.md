# homebridge-abode-garage
[Homebridge](https://github.com/nfarina/homebridge) plugin that supports commands for a garage door opener. The status of the garage comes from an abode door contact `doorContactId`. You can control the garage with a HTTP GET request to `relayUrl`.

## Installation

```
npm i -g homebridge-abode-garage
```

## Configuration

Configuration sample:

```json
"accessories": [
    {
        "accessory":      "Garage",
            "name":           "The Garage",
            "relayUrl": "http://",
            "abode": {
                "username":      "",
                "password":      "",
                "doorContactId": "00:00000000"
            }
    }
]

```

## Abode API

I created and am using [abode-api](https://github.com/hbeckeri/abode-api) to control the alam in [homebridge-abode](https://github.com/hbeckeri/homebridge-abode) (not required for homebridge-abode-garage to work) and to get the status of the door contact.
To obtain the id of the door contact visit [abode-api](https://github.com/hbeckeri/abode-api) and look at `abode.devices()` and find the `id` of the door contact you have attached yo your garage, then add the id as `doorContactId` in the configuration file.

You need to specify your abode login credentials in the configuration file.
