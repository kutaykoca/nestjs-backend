/* The KnnService class is responsible for creating a rotator based on given locations and a user's
location, calculating the distance between two points on the Earth's surface, and handling any
errors that may occur during the process. */

/* KnnService sınıfı, verilen konumlara ve kullanıcıya göre bir döndürücü oluşturmaktan sorumludur.
konum belirleme, Dünya yüzeyindeki iki nokta arasındaki mesafeyi hesaplama ve herhangi bir
işlem sırasında oluşabilecek hatalar. */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class KnnService {

    private API_KEY:string;

    constructor(){
        this.API_KEY = "AIzaSyDFlunIEVJ07Y7-s4wPdDAnOJA1ucg9HCI"
    }
    /**
     * Create a rotator based on the given locations and user location.
     *
     * @param {any} locations - The array of locations to compare with the user location.
     * @param {any} myLocation - The user's location.
     * @return {Promise<any>} A promise that resolves to an object containing the closest location and rotation data.
     * @throws {HttpException} If there is an error in the distance calculation or creating the rotation.
     */

    /**
     * Verilen konumlara ve kullanıcı konumuna göre bir döndürücü oluşturun.
     *
     * @param {any} locations - Kullanıcı konumuyla karşılaştırılacak konumlar dizisi.
     * @param {any} myLocation - Kullanıcının konumu.
     * @return {Promise<any>} En yakın konum ve rotasyon verilerini içeren bir nesneye çözümlenen bir promise.
     * @throws {HttpException} Mesafe hesaplamasında veya rotasyonun oluşturulmasında bir hata varsa.
     */
    async createRotator(locations:any,myLocation:any){
        try{
            
            let minDistance = Infinity; // Başlangıçta en küçük değeri sonsuz olarak ayarlıyoruz
            let closestLocation:any;

           for (const location of locations){
            
                const calculateDistance = this.calculator(
                    parseFloat(location.mapLat),
                    parseFloat(location.mapLong),
                    parseFloat(myLocation.latitude),
                    parseFloat(myLocation.longitude)
                )

                if (calculateDistance < minDistance) {
                    minDistance = calculateDistance;
                    closestLocation = location;
                }
           }

           const startCoordinate = `${myLocation.latitude},${myLocation.longitude}`
           const endCoordinate = `${closestLocation.mapLat},${closestLocation.mapLong}`

           // Create Google API Rotaiton
           const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoordinate}&destination=${endCoordinate}&key=${this.API_KEY}`

           const response = await axios.get(URL)
           console.log(response.data.routes)

           const resultData= {
            "distance": {
                name: closestLocation.name,
                latitude: closestLocation.mapLat,
                longitude: closestLocation.mapLong,
                distance: minDistance.toFixed(2) + "km"
            },
            "rotation": response.data.routes
           }
           

           return resultData

        }catch(err){
            throw new HttpException({
                "message": "Distance calculator and create rotation error"
            }, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * Calculates the distance in kilometers between two points on the Earth's surface.
     *
     * @param {number} lat1 - The latitude of the first point.
     * @param {number} lon1 - The longitude of the first point.
     * @param {number} lat2 - The latitude of the second point.
     * @param {number} lon2 - The longitude of the second point.
     * @return {number} The distance in kilometers between the two points.
     */

    /**
     * Dünya yüzeyindeki iki nokta arasındaki mesafeyi kilometre cinsinden hesaplar.
     *
     * @param {number} lat1 - İlk noktanın enlemi.
     * @param {number} lon1 - İlk noktanın boylamı.
     * @param {number} lat2 - İkinci noktanın enlemi.
     * @param {number} lon2 - İkinci noktanın boylamı.
     * @return {number} İki nokta arasındaki kilometre cinsinden mesafe.
     */
    private calculator(lat1:number, lon1:number, lat2:number,lon2:number){
        try{

            const R = 6371; // Dünya yarıçapı (kilometre cinsinden)
            const dLat = (lat2 - lat1) * Math.PI / 180; // Enlem farkı
            const dLon = (lon2 - lon1) * Math.PI / 180; // Boylam farkı
            const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // İki nokta arasındaki mesafe
            
            return distance;


        }catch(err){
            throw new HttpException({
                "message" : ""
            }, HttpStatus.BAD_GATEWAY)
        }
    }
}