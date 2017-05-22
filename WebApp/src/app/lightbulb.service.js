"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var LightbulbService = (function () {
    function LightbulbService(http) {
        this.http = http;
        this.lightbulbsUrl = 'http://localhost:3000/lights'; // URL du serveur local (API)
        this.lightbulbUniqueUrl = 'http://localhost:3000/lights/unique';
    }
    LightbulbService.prototype.getLightbulbs = function () {
        return this.http.get(this.lightbulbsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    LightbulbService.prototype.getLightbulb = function (id) {
        return this.http.get(this.lightbulbUniqueUrl + "/" + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    LightbulbService.prototype.postLightbulb = function (id, red, green, blue) {
        console.log("FIRED POST");
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.lightbulbsUrl, {
            id: id,
            red: red,
            green: green,
            blue: blue
        }, options).toPromise().then(function (response) { return console.log(response); })
            .catch(this.handleError);
    };
    LightbulbService.prototype.handleError = function (error) {
        console.error('An error as occured', error);
        return Promise.reject(error.message || error);
    };
    return LightbulbService;
}());
LightbulbService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LightbulbService);
exports.LightbulbService = LightbulbService;
//# sourceMappingURL=lightbulb.service.js.map