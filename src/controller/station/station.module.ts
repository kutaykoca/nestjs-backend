import { Module } from "@nestjs/common";
import { StationController } from "./station.controller";
import { KnnService } from "src/services/knn.service";

/**
 * The module that defines the routes and providers for the station feature.
 */

/**
 * İstasyon özelliği için rotaları ve sağlayıcıları tanımlayan modül.
 */
@Module({
    controllers: [StationController],
    providers: [KnnService],
})
export class StationModule {}
