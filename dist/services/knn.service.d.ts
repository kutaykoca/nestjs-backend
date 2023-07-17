export declare class KnnService {
    private API_KEY;
    constructor();
    createRotator(locations: any, myLocation: any): Promise<{
        distance: {
            name: any;
            latitude: any;
            longitude: any;
            distance: string;
        };
        rotation: any;
    }>;
    private calculator;
}
