export interface IGeo {
    calling_code: number,
    city: string,
    connection_type: string,
    continent_code: string,
    continent_name: string,
    country_capital: string,
    country_code2: string,
    country_code3: string,
    country_flag: string,
    country_name: string,
    country_tld: string,
    currency: {
        code: string,
        name: string,
        symbol: string,
    },
    district: string,
    geoname_id: number,
    ip: string,
    is_eu: boolean,
    isp: string,
    languages: string,
    latitude: string,
    longitude: string,
    organization: string,
    state_code: string
    state_prov: string
    time_zone: {
        current_time: string,
        current_time_unix: number,
        dst_savings: number,
        is_dst: boolean,
        name: string
        offset: number
    },
    zipcode: string
}
