var Service;
var Characteristic;

let axios = require('axios');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-abode-garage", "Garage", AbodeGarageAccessory);
};

function AbodeGarageAccessory(log, config) {
    this.abode = require('abode-api').abode(config.abode.username, config.abode.password);
    this.doorContactId = config.abode.doorContactId;
    this.relayUrl = config.relayUrl;
    this.log = log;
    this.name = config.name;

    this.garageService = new Service.GarageDoorOpener(this.name);

    this.garageService
        .getCharacteristic(Characteristic.TargetDoorState)
        .on('get', this.getStatus.bind(this))
        .on('set', this.setStatus.bind(this));

    this.garageService
        .getCharacteristic(Characteristic.CurrentDoorState)
        .on('get', this.getStatus.bind(this));
}

AbodeGarageAccessory.prototype.getStatus = function (callback) {
    this.abode.devices()
        .then(({ data }) => {
            let device = data.find(each => each.id === this.doorContactId);

            if (device) {
                let status = device.status === 'Closed' ? Characteristic.CurrentDoorState.CLOSED : Characteristic.CurrentDoorState.OPEN;
                return callback(null, status);
            }

            return callback(null);
        })
        .catch(err => callback(null));
};

AbodeGarageAccessory.prototype.setStatus = function (powerOn, callback) {
    return axios.get(this.relayUrl)
        .then(() => callback(null))
        .catch(() => callback(null));
};

AbodeGarageAccessory.prototype.getServices = function () {
    return [this.garageService];
};
