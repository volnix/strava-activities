import { DetailedActivityResponse } from 'strava-v3';
import Run, { ActivityType } from './Run';

const clientId = "114270";
const refreshToken = "3f302b350a6bb186c16b5467f174393c32dba09c";
const clientSecret = "fe1c4243d53712c60d29aeeb7ebee347b1161c13";

interface RefreshTokenResponse {
    token_type: string;
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
}

async function getAccessToken() {
    const refreshTokenURL: string = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    const response: RefreshTokenResponse = await fetch(refreshTokenURL,{
        method: 'post'
    }).then(res => res.json());

    console.debug("Token: ", response.access_token);
    return response.access_token;
}

const getActivities = async (num: number) => {
    const token = await getAccessToken();
    const data = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=${num}&page=1`, {
        headers: {'Authorization': `Bearer ${token}`}
    }).then(res => res.json());

    let activities: Run[] = data.map((activity: DetailedActivityResponse) => {

        let processed_activity: Run = {
            distance: Number((activity.distance as number * 0.0006213712).toFixed(2)),
            type: activity.sport_type as ActivityType,
            date: new Date(activity.start_date),
            elevation: activity.total_elevation_gain as number,
            id: activity.id,
            name: activity.name,
            polyline: activity.map?.summary_polyline as string
        };

        return processed_activity;
    });

    return activities;
};

export { getActivities };