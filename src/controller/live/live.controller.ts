import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { LiveService } from "src/services/live.service";

@Controller('live')
export class LiveController {

    constructor(private liveService: LiveService){}

    @Get('')
    async getLiveBus(){

        try{
            const data = await this.liveService.getLiveBus()

            
            return {
                "message": "success",
                "data": data
            }
        }catch(err){
            throw new HttpException({
                "message": "Live bus error [1]"
            }, HttpStatus.BAD_REQUEST)
        }
    }


    @Post('getByStationName')
    async getByStationname(@Body() name:any){
        try{

            const data = await this.liveService.getLiveBus()
            const filterData = data.filter((item) => {
                return item.stationName ===  name.name
            })

            return {
                "message": "success",
                "data": filterData
            }
        }catch(err){
            throw new HttpException({
                "message": "Live bus error [2]"
            }, HttpStatus.BAD_REQUEST)
        }
    }
    
}