export declare class ScraperService {
    private httpsAgent;
    private BASE_URL;
    private getLocationListURL;
    private getLocationRotationURL;
    locationDetailList: string[];
    private _locationList;
    _locationDetail(): Promise<string[]>;
    createRouteCode(): Promise<any[]>;
}
