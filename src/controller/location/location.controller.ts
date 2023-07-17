/* The LocationController class is responsible for handling HTTP requests related to locations,
including scraping location data and saving it to a database. */

/* LocationController sınıfı, konumlarla ilgili HTTP isteklerini işlemekten sorumludur,
konum verilerinin kazınması ve bir veritabanına kaydedilmesi dahil. */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { AppDataSource } from "src/helper/db";
import { Location } from "src/entities/location.entity";
import { ScraperService } from "src/services/scraper.service";
import { QueryFailedError } from "typeorm";

@Controller('location')
export class LocationController {

    private locationRepository:any
    private gData:any

    constructor(
        private scraperService :ScraperService
        ){
            this.locationRepository = AppDataSource.getRepository(Location)
        }
    

     /* The `@Get('get/all')` decorator is used to define the HTTP route for this method. It specifies
     that this method should be called when a GET request is made to the '/location/get/all'
     endpoint. */

     /* `@Get('get/all')` dekoratörü bu yöntemin HTTP rotasını tanımlamak için kullanılır. Şunları belirtir
     '/location/get/all' adresine bir GET isteği yapıldığında bu yöntemin çağrılması gerektiğini belirtir. */
     @Get('get/all')
     async getAllLocation(){
        try{
            // Scraping All Location
            const data = await this.scraperService._locationDetail()
            // Save Database


            data.flatMap(child => child).forEach(async (item) => {
                
                const jsonData = JSON.parse(JSON.stringify(item))
                // Unique Control
                const saveData = {
                    "mapLong" : jsonData.mapLong,
                    "mapLat": jsonData.mapLat,
                    "name": jsonData.name
                }
                if (QueryFailedError){
                    return;
                }
                this.locationRepository.save(saveData, {
                    flush: true
                })

                this.gData = saveData
                
            })
            
            return {
                "message": "Get all location success",
                "data": data
            }

        }catch(err){
            throw new HttpException({
                "message": "not success",
                "err": "get all location error"
            }, HttpStatus.BAD_GATEWAY)

        }
     }
     @Post('get/byname')
     async getLocationById(@Body() name:any){
         try{
            
            const getData = await this.locationRepository
            .createQueryBuilder('location')
            .where('location.name LIKE :partialValue', { partialValue: `%${name.name}%` })
            .getMany()
            
            return {
                "message": "success",
                "data": getData
            }

         }catch(err){
            console.log(err)
            throw new HttpException({
                "message": "get location by name error"
            }, HttpStatus.BAD_GATEWAY)
         }
     }
     
}