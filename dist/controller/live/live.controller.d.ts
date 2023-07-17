import { LiveService } from "src/services/live.service";
export declare class LiveController {
    private liveService;
    constructor(liveService: LiveService);
    getLiveBus(): Promise<{
        message: string;
        data: any[];
    }>;
    getByStationname(name: any): Promise<{
        message: string;
        data: any[];
    }>;
}
