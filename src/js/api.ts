import {URLAZAN, URLTIMEZONE, URLIPGEO, APIKEYTIMEZONE} from "./config.ts";

export async function getApiGeolocation() {
    try {
        const res = await fetch(`${URLIPGEO}?apiKey=${APIKEYTIMEZONE}`)
        return await res.json()
    } catch (e) {
        throw new Error('Error: ' + e)
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

export async function getApiAzan(year: number, month: number, city: string, country: string) {
    try {
        const res = await fetch(`${URLAZAN}/${year}/${month}?city=${city}&country=${country}&method=2&tune=0,0,-3,3,77,3,0`)
        return await res.json()
    } catch (e) {
        throw new Error('Error' + e)
    }
}
