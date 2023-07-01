import {URLAZAN, URLTIMEZONE, APIKEYTIMEZONE} from "./config.ts";

export async function getApiAzan(city: string, country: string) {
    try {
        const res = await fetch(`${URLAZAN}/2023/6?city=${city}&country=${country}&method=15`)
        return await res.json()
    } catch (e) {
        throw new Error('Error' + e)
    }
}

export async function getApiTimeZone(city: string, country: string) {
    try {
        const res = await fetch(`${URLTIMEZONE}?apiKey=${APIKEYTIMEZONE}&location=${city},%20${country}`)
        return await res.json()
    } catch (e) {
        throw new Error('Error: ' + e)
    }
}