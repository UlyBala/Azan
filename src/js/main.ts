import {getApiAzan, getApiTimeZone} from "./api.ts";
import {ITimezone} from "./interface/ITimezone.ts";
import {IAzan, IAzanContent} from "./interface/IAzan.ts";
import {IKeyDay} from "./interface/IKeyDay.ts";

let azanData
let timezone

async function azan() {
    azanData = await getApiAzan('shymkent', 'kz')
    azanToday(azanData)

    timezone = await getApiTimeZone('shymkent ', 'kz')
    cutDate(timezone)
}
azan()


function cutDate(day: ITimezone): string {
    let str: string = day.date_time_wti
    return str.slice(5, -15)
}


function azanToday(azan: IAzan): IKeyDay {
    const daysAzan: IAzanContent[] = azan.data

    const keyDay: IKeyDay = {};
    daysAzan.forEach((day: IAzanContent) => {
        let date: string = day.date.readable.split(' ').join('')
        keyDay[date] = day.timings
    })
    return keyDay
}

