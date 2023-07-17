/* The LocationModule class is a TypeScript module that imports and exports the LocationController and
ScraperService classes. */

/* LocationModule sınıfı, LocationController ve LocationController'ı içe ve dışa aktaran bir TypeScript modülüdür. */
import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { ScraperService } from "src/services/scraper.service";

@Module({
    controllers: [LocationController],
    providers: [ScraperService],
})

export class LocationModule {}