export interface IAzan {
    code: string,
    data: [IAzanContent],
    status: string
}

export interface ITimings {
    Asr: string,
    Dhuhr: string,
    Fajr: string,
    Firstthird?: string,
    Imsak?: string,
    Isha: string,
    Lastthird?: string,
    Maghrib: string,
    Midnight?: string,
    Sunrise: string,
    Sunset?: string
}

export interface IAzanContent {
    date: {
        gregorian: {
            date: string,
            day: string,
            designation: {
                abbreviated: string,
                expanded: string
            },
            format: string,
            month: {
                number: number,
                en: string
            },
            weekday: {
                en: string
            }
            year: string
        },
        hijri: {
            date: string,
            day: string,
            designation: {
                abbreviated: string,
                expanded: string
            },
            format: string,
            holidays: [],
            month: {
                ar: string,
                em: string
            },
            weekday: {
                ar: string,
                en: string
            },
            year: string
        },
        readable: string,
        timestamp: string
    },
    meta: {
        latitude: number,
        latitudeAdjustmentMethod: string,
        longitude: number,
        method: {
            id: number,
            location: {
                latitude: number,
                longitude: number
            },
            name: string,
            params: {
                Fajr: number,
                Isha: number,
            }
        },
        midnightMode: string,
        offset: {
            Asr: number,
            Dhuhr: number,
            Fajr: number,
            Imsak: number,
            Isha: number,
            Maghrib: number,
            Midnight: number,
            Sunrise: number,
            Sunset: number
        },
        school: string,
        timezone: string
    },
    timings: ITimings
}
