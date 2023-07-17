"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationModule = void 0;
const common_1 = require("@nestjs/common");
const station_controller_1 = require("./station.controller");
const knn_service_1 = require("../../services/knn.service");
let StationModule = exports.StationModule = class StationModule {
};
exports.StationModule = StationModule = __decorate([
    (0, common_1.Module)({
        controllers: [station_controller_1.StationController],
        providers: [knn_service_1.KnnService],
    })
], StationModule);
//# sourceMappingURL=station.module.js.map