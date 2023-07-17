"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const https = require("https");
const cheerio = require("cheerio");
(0, common_1.Injectable)();
class ScraperService {
    constructor() {
        this.httpsAgent = new https.Agent({ rejectUnauthorized: false });
        this.BASE_URL = "https://www.balikesirulasim.com.tr";
        this.getLocationListURL = "/ajax/busline/list/bandirma";
        this.getLocationRotationURL = "/hat/";
        this.locationDetailList = [];
    }
    async _locationList() {
        try {
            const httpsAgent = this.httpsAgent;
            const response = await axios_1.default.get(this.BASE_URL + this.getLocationListURL, {
                httpsAgent
            });
            return response.data;
        }
        catch (err) {
            throw new common_1.HttpException({
                "message": "Location list error"
            }, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async _locationDetail() {
        try {
            let resultData;
            const baseLocation = await this._locationList();
            await Promise.all(baseLocation.map(async (result) => {
                const httpsAgent = this.httpsAgent;
                const URL = this.BASE_URL + this.getLocationRotationURL + result.seo;
                const response = await axios_1.default.get(URL, {
                    httpsAgent
                });
                const $ = cheerio.load(response.data).html().toString();
                const allCoordinates = $.match(/let stationsData = \[(.*?)\]/);
                if (allCoordinates && allCoordinates.length > 0) {
                    for (const coordinate of allCoordinates) {
                        const parseData = coordinate.replace('let stationsData = ', '').replace('[', '').replace(']', '');
                        if (parseData.length > 0) {
                            const parsedData = JSON.parse(`[${parseData}]`);
                            this.locationDetailList.push(parsedData);
                        }
                    }
                }
            }));
            resultData = this.locationDetailList;
            return this.locationDetailList;
        }
        catch (err) {
            throw new common_1.HttpException({
                "message": "Location detail error"
            }, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async createRouteCode() {
        try {
            const allRouteCode = [];
            const baseLocation = await this._locationList();
            await Promise.all(baseLocation.map(async (result) => {
                const httpsAgent = this.httpsAgent;
                const URL = this.BASE_URL + this.getLocationRotationURL + result.seo;
                const response = await axios_1.default.get(URL, {
                    httpsAgent
                });
                const regex = /routeCode":\s*"([^"]+)"/;
                const match = response.data.match(regex);
                if (match) {
                    allRouteCode.push({
                        "routeCode": match[1].split(","),
                        "station": result.seo
                    });
                }
            }));
            return allRouteCode;
        }
        catch (err) {
            throw new common_1.HttpException({}, common_1.HttpStatus.BAD_REQUEST);
        }
    }
}
exports.ScraperService = ScraperService;
//# sourceMappingURL=scraper.service.js.map