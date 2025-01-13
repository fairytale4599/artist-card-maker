import axios from "axios";
import qs from 'qs';

export const fetchAccessToken = async () => {
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            qs.stringify({
                grant_type: "client_credentials",
                client_id: "4c855c87fd5348fcafba2d20ad0e855e",
                client_secret: "c9b3f252305d4369bbb6f6c167400767",
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
};