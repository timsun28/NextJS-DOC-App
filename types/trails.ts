export interface DOCTrail {
    assetId: string;
    name: string;
    introduction: string;
    introductionThumbnail: string;
    permittedActivities: string[];
    distance: number | null;
    walkDuration: string;
    walkDurationCategory: string[];
    walkTrackCategory: string[];
    wheelchairsAndBuggies: boolean | null;
    mtbDuration: string | null;
    mtbDurationCategory: string[];
    mtbTrackCategory: string[];
    kayakingDuration: string | null;
    dogsAllowed: string;
    locationString: string;
    locationArray: string[];
    region: string[];
    staticLink: string;
    lon: number;
    lat: number;
}
