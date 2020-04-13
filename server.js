var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var path = require('path');
var dotenv = require('dotenv');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 5000;
app.use(cors());
dotenv.config();
var fetchTest = function (city) { return __awaiter(_this, void 0, void 0, function () {
    var locationFetch, locationData, latitude, longitude, weatherFetch, weatherData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://open.mapquestapi.com/geocoding/v1/address?key=" + process.env.MAPQUEST_KEY + "&city=" + city)];
            case 1:
                locationFetch = _a.sent();
                return [4 /*yield*/, locationFetch.json()];
            case 2:
                locationData = _a.sent();
                latitude = locationData.results[0].locations[0].latLng.lat;
                longitude = locationData.results[0].locations[0].latLng.lng;
                return [4 /*yield*/, fetch("https://api.darksky.net/forecast/" + process.env.DARKSKY_KEY + "/" + latitude + "," + longitude)];
            case 3:
                weatherFetch = _a.sent();
                return [4 /*yield*/, weatherFetch.json()];
            case 4:
                weatherData = _a.sent();
                return [2 /*return*/, weatherData];
        }
    });
}); };
app.use(express.static(path.join(__dirname, 'client/build')));
// // create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });
//API return
app.get('/weatherAPI/:city', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var locationData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchTest(req.params.city)];
            case 1:
                locationData = _a.sent();
                res.send(locationData);
                return [2 /*return*/];
        }
    });
}); });
//Catchall handler
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.listen(port, function () { return console.log("Listening on port " + port); });
