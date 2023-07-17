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
exports.KnnService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let KnnService = exports.KnnService = class KnnService {
    constructor() {
        this.API_KEY = "AIzaSyDFlunIEVJ07Y7-s4wPdDAnOJA1ucg9HCI";
    }
    async createRotator(locations, myLocation) {
        try {
            let minDistance = Infinity;
            let closestLocation;
            for (const location of locations) {
                const calculateDistance = this.calculator(parseFloat(location.mapLat), parseFloat(location.mapLong), parseFloat(myLocation.latitude), parseFloat(myLocation.longitude));
                if (calculateDistance < minDistance) {
                    minDistance = calculateDistance;
                    closestLocation = location;
                }
            }
            const startCoordinate = `${myLocation.latitude},${myLocation.longitude}`;
            const endCoordinate = `${closestLocation.mapLat},${closestLocation.mapLong}`;
            const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoordinate}&destination=${endCoordinate}&key=${this.API_KEY}`;
            const response = await axios_1.default.get(URL);
            console.log(response.data.routes);
            const resultData = {
                "distance": {
                    name: closestLocation.name,
                    latitude: closestLocation.mapLat,
                    longitude: closestLocation.mapLong,
                    distance: minDistance.toFixed(2) + "km"
                },
                "rotation": response.data.routes
            };
            return resultData;
        }
        catch (err) {
            throw new common_1.HttpException({
                "message": "Distance calculator and create rotation error"
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    calculator(lat1, lon1, lat2, lon2) {
        try {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance;
        }
        catch (err) {
            throw new common_1.HttpException({
                "message": ""
            }, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.KnnService = KnnService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KnnService);
//# sourceMappingURL=knn.service.js.map