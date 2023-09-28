enum ActivityType {
    TrailRun = 'TrailRun',
    Run = 'Run',
    MountainBikeRide = 'MountainBikeRide'
};

export { ActivityType };

export default interface Run {
    distance: number;
    type: ActivityType;
    date: Date;
    elevation: number;
    id: string;
    name: string;
    polyline: string;
};