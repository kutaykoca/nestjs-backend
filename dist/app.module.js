"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const scraper_service_1 = require("./services/scraper.service");
const knn_service_1 = require("./services/knn.service");
const location_module_1 = require("./controller/location/location.module");
const station_module_1 = require("./controller/station/station.module");
const live_module_1 = require("./controller/live/live.module");
const live_service_1 = require("./services/live.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [station_module_1.StationModule, location_module_1.LocationModule, live_module_1.LiveModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, scraper_service_1.ScraperService, knn_service_1.KnnService, live_service_1.LiveService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map