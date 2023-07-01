export interface ITimezone {
    date: string,
    date_time: string,
    date_time_txt: string,
    date_time_unix: number,
    date_time_wti: string,
    date_time_ymd: string,
    dst_savings: number,
    geo: {
        city: string,
        country: string,
        latitude: number,
        longitude: number,
        state: ''
    },
    is_dst: boolean,
    month: number,
    time_12: string,
    time_24: string,
    timezone: string,
    timezone_offset: number,
    timezone_offset_with_dst: number,
    week: number,
    year: number
    year_abbr: string,
}
