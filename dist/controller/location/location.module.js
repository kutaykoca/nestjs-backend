"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModule = void 0;
const common_1 = require("@nestjs/common");
const location_controller_1 = require("./location.controller");
const scraper_service_1 = require("../../services/scraper.service");
let LocationModule = exports.LocationModule = class LocationModule {
};
exports.LocationModule = LocationModule = __decorate([
    (0, common_1.Module)({
        controllers: [location_controller_1.LocationController],
        providers: [scraper_service_1.ScraperService],
    })
], LocationModule);
//# sourceMappingURL=location.module.js.map