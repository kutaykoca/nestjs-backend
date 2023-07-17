import { Module } from "@nestjs/common";
import { LiveController } from "./live.controller";
import { LiveService } from "src/services/live.service";
import { ScraperService } from "src/services/scraper.service";

@Module({
    imports: [],
    controllers: [LiveController],
    providers: [LiveService, ScraperService],
    exports: [],
})

export class LiveModule {}