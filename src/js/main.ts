import {getApiAzan, getApiTimeZone} from "./api.ts";
import {ITimezone} from "./interface/ITimezone.ts";
import {IAzan, IAzanContent, ITimings} from "./interface/IAzan.ts";
import {IKeyDay} from "./interface/IKeyDay.ts";

const day = document.querySelector('.day') as HTMLElement


async function azan() {
    const timezone = await getApiTimeZone('shymkent ', 'kz')
    const cutDay: string = cutDate(timezone)
    const array: number[] = getYearAndMonth(timezone)
    day.innerHTML = cutDay

    const azanData = await getApiAzan(array[0],array[1],'shymkent', 'kz')
    const keyDayObj: IKeyDay = keyDay(azanData)

    const today = todayAzan(cutDay, keyDayObj)
    if (typeof today === 'object') {
        outPut(today)
    }
}
azan()


function cutDate(day: ITimezone): string {
    let str: string = day.date_time_wti
    return str.slice(5, -15)
}


function getYearAndMonth(day: ITimezone): number[] {
    return [day.year, day.month]
}


function keyDay(azan: IAzan): IKeyDay {
    const daysAzan: IAzanContent[] = azan.data

    const keyDayObj: IKeyDay = {};
    daysAzan.forEach((day: IAzanContent) => {
        let date: string = day.date.readable.split(' ').join('')
        keyDayObj[date] = day.timings
    })
    return keyDayObj
}

function todayAzan(day: string, azan: IKeyDay): ITimings | undefined {
    const today: string = day.split(' ').join('')
    if (today in azan) {
        delete azan[today].Imsak
        delete azan[today].Firstthird
        delete azan[today].Lastthird
        delete azan[today].Midnight
        delete azan[today].Sunset
        return azan[today]
    }
}


function getIdTime(str: string) {
    const fajr = document.getElementById(`fajr-${str}`) as HTMLElement
    const sunrise = document.getElementById(`sunrise-${str}`) as HTMLElement
    const dhuhr = document.getElementById(`dhuhr-${str}`) as HTMLElement
    const asr = document.getElementById(`asr-${str}`) as HTMLElement
    const maghrib = document.getElementById(`maghrib-${str}`) as HTMLElement
    const isha = document.getElementById(`isha-${str}`) as HTMLElement

    return [fajr, sunrise, dhuhr, asr, maghrib, isha]
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function outPut(namaz: ITimings) {
    const data: string[] = ['web', 'mobile']

    data.forEach(item => {
        const dataSome = getIdTime(item);
        for (let i = 0; i < dataSome.length; i++) {
            let keyById = capitalizeFirstLetter(dataSome[i].id.split("-")[0])
            // @ts-ignore
            dataSome[i].innerHTML = namaz[keyById].slice(0, -5)
        }
    })
}
