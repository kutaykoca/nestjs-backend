import { KnnService } from "src/services/knn.service";
export declare class StationController {
    private knnService;
    private locationRepository;
    constructor(knnService: KnnService);
    calculate(myLocaiton: {
        latitude: string;
        longitude: string;
    }): Promise<{
        message: string;
        data: {
            distance: {
                name: any;
                latitude: any;
                longitude: any;
                distance: string;
            };
            rotation: any;
        };
    }>;
}
