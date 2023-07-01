import {getApiAzan, getApiTimeZone} from "./api.ts";
import {ITimezone} from "./interface/ITimezone.ts";
import {IAzan, IAzanContent} from "./interface/IAzan.ts";
import {IKeyDay} from "./interface/IKeyDay.ts";

const azan = await getApiAzan('shymkent', 'kz')
const today = await getApiTimeZone('shymkent ', 'kz')


function cutDate(day: ITimezone): string {
    let str: string = day.date_time_wti
    return str.slice(5, -15)
}
const day:string = cutDate(today)
console.log(day + '----')


function azanToday(azan: IAzan) {
    const daysAzan: IAzanContent[] = azan.data

    const keyDay: IKeyDay = {};
    daysAzan.forEach((day: IAzanContent) => {
        let date: string = day.date.readable.split(' ').join('')
        console.log(day)
        keyDay[date] = day.timings

    })

    console.log(keyDay)
}

azanToday(azan)
