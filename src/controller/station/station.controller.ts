/* The `StationController` class is a NestJS controller that handles HTTP POST requests to calculate
the rotation of a location based on its latitude and longitude. */

/* `StationController` sınıfı, hesaplama yapmak için HTTP POST isteklerini işleyen bir NestJS denetleyicisidir. */
import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AppDataSource } from "src/helper/db";
import { KnnService } from "src/services/knn.service";
import { Location } from "src/entities/location.entity";

@Controller('station')
export class StationController {

    private locationRepository:any

    constructor(
        private knnService: KnnService
    ){
        this.locationRepository = AppDataSource.getRepository(Location)
    }

   /* The `@Post('calculate')` decorator is used to define an HTTP POST route for the `calculate`
   method in the `StationController` class. This means that when a POST request is made to the
   `/station/calculate` endpoint, this method will be executed. */

   /* `@Post('calculate')` dekoratörü `calculate` için bir HTTP POST rotası tanımlamak için kullanılır
   metodunu `StationController` sınıfında kullanabilirsiniz. Bu, `StationController` sınıfına bir POST isteği yapıldığında
   '/station/calculate' uç noktası, bu yöntem çalıştırılacaktır. */
    
   @Post('calculate')
    async calculate(@Body() myLocaiton:{latitude: string, longitude: string}){
        try{

            // Get All Station
            const allLocation = await this.locationRepository.find()
            
            const data = await this.knnService.createRotator(allLocation, myLocaiton)

            return {
                "message": "ratation calculate success",
                "data": data
            }

        }catch(err){
            console.log(err)
            throw new HttpException({
                "message": "Distance calculate error"
            }, HttpStatus.BAD_REQUEST)
        }
    }
}