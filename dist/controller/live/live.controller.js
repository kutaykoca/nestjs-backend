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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveController = void 0;
const common_1 = require("@nestjs/common");
const live_service_1 = require("../../services/live.service");
let LiveController = exports.LiveController = class LiveController {
    constructor(liveService) {
        this.liveService = liveService;
    }
    async getLiveBus() {
        try {
            const data = await this.liveService.getLiveBus();
            return {
                "message": "success",
                "data": data
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                "message": "Live bus error [1]"
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getByStationname(name) {
        try {
            const data = await this.liveService.getLiveBus();
            const filterData = data.filter((item) => {
                return item.stationName === name.name;
            });
            return {
                "message": "success",
                "data": filterData
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                "message": "Live bus error [2]"
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LiveController.prototype, "getLiveBus", null);
__decorate([
    (0, common_1.Post)('getByStationName'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LiveController.prototype, "getByStationname", null);
exports.LiveController = LiveController = __decorate([
    (0, common_1.Controller)('live'),
    __metadata("design:paramtypes", [live_service_1.LiveService])
], LiveController);
//# sourceMappingURL=live.controller.js.map