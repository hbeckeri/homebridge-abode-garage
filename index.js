var Service;
var Characteristic;

let axios = require('axios');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-abode-garage", "Abode Garage", FakeBulbAccessory);
};

function FakeBulbAccessory(log, config) {
    this.relayUrl = config.relayUrl;
    this.log = log;
    this.name = config.name;
    this.bulbName = config.bulb_name || this.name; // fallback to "name" if you didn't specify an exact "bulb_name"
    this.binaryState = 0; // bulb state, default is OFF
    this.log("WUBA: Starting a fake bulb device with name '" + this.bulbName + "'...");
}

FakeBulbAccessory.prototype.getPowerOn = function (callback) {
	return callback(null, false);
};

FakeBulbAccessory.prototype.setPowerOn = function (powerOn, callback) {
    return axios.get(this.relayUrl)
        .then(() => callback(null))
        .catch(() => callback(null));
};

FakeBulbAccessory.prototype.getServices = function () {
    var lightbulbService = new Service.Lightbulb(this.name);

    lightbulbService
        .getCharacteristic(Characteristic.On)
        .on('get', this.getPowerOn.bind(this))
        .on('set', this.setPowerOn.bind(this));

    return [lightbulbService];
};
