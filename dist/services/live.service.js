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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveService = void 0;
const common_1 = require("@nestjs/common");
const scraper_service_1 = require("./scraper.service");
const axios_1 = require("axios");
const https = require("https");
let LiveService = exports.LiveService = class LiveService {
    constructor(scraperService) {
        this.scraperService = scraperService;
        this.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }
    async getLiveBus() {
        try {
            const routeCodes = await this.scraperService.createRouteCode();
            const returnData = [];
            const URL = "https://www.balikesirulasim.com.tr/ajax/busline/live";
            const httpsAgent = this.httpsAgent;
            for (const routeCode of routeCodes) {
                const response = await axios_1.default.post(URL, { routeCode: routeCode.routeCode[0] }, { httpsAgent });
                const jsonData = {
                    "busdata": response.data,
                    "routeName": routeCode,
                    "stationName": routeCode.station
                };
                returnData.push(jsonData);
            }
            return returnData;
        }
        catch (err) {
            throw new common_1.HttpException({
                "message": "live bus error"
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.LiveService = LiveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [scraper_service_1.ScraperService])
], LiveService);
//# sourceMappingURL=live.service.js.map