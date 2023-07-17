import { ScraperService } from "src/services/scraper.service";
export declare class LocationController {
    private scraperService;
    private locationRepository;
    private gData;
    constructor(scraperService: ScraperService);
    getAllLocation(): Promise<{
        message: string;
        data: string[];
    }>;
    getLocationById(name: any): Promise<{
        message: string;
        data: any;
    }>;
}
