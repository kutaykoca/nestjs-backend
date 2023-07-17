/* The ScraperService class is a TypeScript class that retrieves location details from a website using
Axios and Cheerio. */

/* ScraperService sınıfı, bir web sitesinden konum ayrıntılarını alan bir TypeScript sınıfıdır.
Axios ve Cheerio. */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import * as https from 'https'
import * as cheerio from 'cheerio';

Injectable()
export class ScraperService {

    private httpsAgent = new https.Agent({rejectUnauthorized: false})
    private BASE_URL:string = "https://www.balikesirulasim.com.tr"
    private getLocationListURL:string = "/ajax/busline/list/bandirma"
    private getLocationRotationURL:string = "/hat/"

    public locationDetailList:string[] = []
    
    // Get Base Location List


    /**
     * Retrieves the location list from the API endpoint.
     *
     * @return {Promise} A promise that resolves with the location list data.
     * @throws {HttpException} Throws an exception if there is an error retrieving the location list.
     */

    /**
     * Konum listesini API uç noktasından alır.
     *
     * @return {Promise} Konum listesi verileriyle çözümlenen bir promise.
     * @throws {HttpException} Konum listesi alınırken bir hata oluşursa bir istisna atar.
     */
    private async _locationList(){
        try{

            const httpsAgent = this.httpsAgent
            const response = await axios.get(this.BASE_URL + this.getLocationListURL, {
                httpsAgent
            })
            
            return response.data

        }catch(err){
            
            throw new HttpException({
                "message": "Location list error"
            }, HttpStatus.BAD_GATEWAY)
        }
    }


    /**
     * Fetches the location details.
     *
     * @return {Promise<any[]>} An array of location details.
     */

    /**
     * Konum ayrıntılarını getirir.
     *
     * @return {Promise<any[]>} Bir dizi konum detayı.
     */
    public async _locationDetail(){
        try{

            let resultData:any;

            // Get Location List
            const baseLocation = await this._locationList();
            await Promise.all(baseLocation.map(async (result: any) => {
                const httpsAgent = this.httpsAgent;
                const URL = this.BASE_URL + this.getLocationRotationURL + result.seo;
                const response = await axios.get(URL, {
                    httpsAgent
                });

                const $ = cheerio.load(response.data).html().toString();
                const allCoordinates = $.match(/let stationsData = \[(.*?)\]/);

                if (allCoordinates && allCoordinates.length > 0) {
                    for (const coordinate of allCoordinates) {
                        const parseData = coordinate.replace('let stationsData = ', '').replace('[','').replace(']', '');
                        
                        if (parseData.length > 0){
                            
                            const parsedData = JSON.parse(`[${parseData}]`);
                            this.locationDetailList.push(parsedData)
                        }
                    }
                }
            }));

            resultData = this.locationDetailList
            return this.locationDetailList

            // 
        }catch(err){
            throw new HttpException({
                "message": "Location detail error"
            }, HttpStatus.BAD_GATEWAY)
        }
    }

    // Create Route Code
    public async createRouteCode(){
        try{

            const allRouteCode = []

            const baseLocation = await this._locationList()
            await Promise.all(baseLocation.map(async (result:any) => {
                const httpsAgent = this.httpsAgent;
                const URL = this.BASE_URL + this.getLocationRotationURL + result.seo;
                const response = await axios.get(URL, {
                    httpsAgent
                });

                // Create RouteCode
                const regex = /routeCode":\s*"([^"]+)"/
                const match = response.data.match(regex);

                if(match){
                    allRouteCode.push({
                        "routeCode": match[1].split(","),
                        "station": result.seo 
                    })
                }

            }))
            
            return allRouteCode


        }catch(err){
            throw new HttpException({}, HttpStatus.BAD_REQUEST)
        }
    }
}