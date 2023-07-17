import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import axios from "axios";
import * as https from 'https'


@Injectable()

export class LiveService {
    private httpsAgent = new https.Agent({rejectUnauthorized: false})

    constructor(
        private scraperService: ScraperService
    ){}

    async getLiveBus(){
        try{
            const routeCodes = await this.scraperService.createRouteCode()
            const returnData = []

            // Get Bus 
            const URL = "https://www.balikesirulasim.com.tr/ajax/busline/live"
            const httpsAgent = this.httpsAgent
            for (const routeCode of routeCodes){
                
                const response = await axios.post(URL, {routeCode: routeCode.routeCode[0]}, {httpsAgent})
                
                const jsonData = {
                    "busdata": response.data,
                    "routeName": routeCode,
                    "stationName": routeCode.station
                }

                returnData.push(jsonData)
            }
            
            return returnData
        }catch(err){
            throw new HttpException({
                "message": "live bus error"
            }, HttpStatus.BAD_REQUEST)
        }
    }
}