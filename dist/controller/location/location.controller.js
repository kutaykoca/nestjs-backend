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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../../helper/db");
const location_entity_1 = require("../../entities/location.entity");
const scraper_service_1 = require("../../services/scraper.service");
const typeorm_1 = require("typeorm");
let LocationController = exports.LocationController = class LocationController {
    constructor(scraperService) {
        this.scraperService = scraperService;
        this.locationRepository = db_1.AppDataSource.getRepository(location_entity_1.Location);
    }
    async getAllLocation() {
        try {
            const data = await this.scraperService._locationDetail();
            data.flatMap(child => child).forEach(async (item) => {
                const jsonData = JSON.parse(JSON.stringify(item));
                const saveData = {
                    "mapLong": jsonData.mapLong,
                    "mapLat": jsonData.mapLat,
                    "name": jsonData.name
                };
                if (typeorm_1.QueryFailedError) {
                    return;
                }
                this.locationRepository.save(saveData, {
                    flush: true
                });
                this.gData = saveData;
            });
            return {
                "message": "Get all location success",
                "data": data
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                "message": "not success",
                "err": "get all location error"
            }, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async getLocationById(name) {
        try {
            const getData = await this.locationRepository
                .createQueryBuilder('location')
                .where('location.name LIKE :partialValue', { partialValue: `%${name.name}%` })
                .getMany();
            return {
                "message": "success",
                "data": getData
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException({
                "message": "get location by name error"
            }, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
__decorate([
    (0, common_1.Get)('get/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getAllLocation", null);
__decorate([
    (0, common_1.Post)('get/byname'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationById", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('location'),
    __metadata("design:paramtypes", [scraper_service_1.ScraperService])
], LocationController);
//# sourceMappingURL=location.controller.js.map