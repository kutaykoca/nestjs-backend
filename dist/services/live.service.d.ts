import { ScraperService } from "./scraper.service";
export declare class LiveService {
    private scraperService;
    private httpsAgent;
    constructor(scraperService: ScraperService);
    getLiveBus(): Promise<any[]>;
}
