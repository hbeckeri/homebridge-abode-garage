# homebridge-abode-garage
[Homebridge](https://github.com/nfarina/homebridge) plugin that supports commands for a garage door opener. The status of the garage comes from an abode door contact `doorContactId`. You can control the garage with a HTTP GET request to `relayUrl`.

## Installation
1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g hombridge-abode`
3. Update your configuration file. See `sample-config.json` in this repository for a sample.

## Configuration

Configuration sample:

```json
"accessories": [
  {

  }
]

```
