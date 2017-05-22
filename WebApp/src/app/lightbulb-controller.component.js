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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var lightbulb_1 = require("./lightbulb");
var lightbulb_service_1 = require("./lightbulb.service");
require("rxjs/add/operator/switchMap");
var LightbulbControllerComponent = (function () {
    function LightbulbControllerComponent(lightbulbService, route, location) {
        this.lightbulbService = lightbulbService;
        this.route = route;
        this.location = location;
        this.applyToAll = false;
    }
    LightbulbControllerComponent.prototype.ngOnInit = function () {
        this.getLightbulb();
    };
    LightbulbControllerComponent.prototype.goBack = function () {
        this.location.back();
    };
    LightbulbControllerComponent.prototype.getLightbulb = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.lightbulbService.getLightbulb(+params['id']); })
            .subscribe(function (lightbulb) { return _this.lightbulb = lightbulb; });
        setTimeout(function () {
            _this.getLightbulb();
        }, 2000);
    };
    LightbulbControllerComponent.prototype.onChange = function (newValue) {
        if (this.applyToAll) {
            this.lightbulbService.postLightbulb(null, this.lightbulb.red, this.lightbulb.green, this.lightbulb.blue);
        }
        else {
            this.lightbulbService.postLightbulb(this.lightbulb.id, this.lightbulb.red, this.lightbulb.green, this.lightbulb.blue);
        }
    };
    return LightbulbControllerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", lightbulb_1.Lightbulb)
], LightbulbControllerComponent.prototype, "lightbulb", void 0);
LightbulbControllerComponent = __decorate([
    core_1.Component({
        selector: 'lightbulb-controller',
        templateUrl: './lightbulb-controller.component.html',
        styleUrls: ['./lightbulb-controller.component.css']
    }),
    __metadata("design:paramtypes", [lightbulb_service_1.LightbulbService,
        router_1.ActivatedRoute,
        common_1.Location])
], LightbulbControllerComponent);
exports.LightbulbControllerComponent = LightbulbControllerComponent;
//# sourceMappingURL=lightbulb-controller.component.js.map