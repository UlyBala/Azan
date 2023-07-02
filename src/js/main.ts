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
    const sortTime = sortData(today)
    outPut(sortTime)
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


function todayAzan(day: string, azan: IKeyDay): ITimings {
    const today: string = day.split(' ').join('')

    const arr = ['Imsak', 'Firstthird', 'Lastthird', 'Midnight', 'Sunset']
    const obj = {}

    if (today in azan) {
        for (let i = 0; i < arr.length; i++) {
            // @ts-ignore
            delete azan[today][arr[i]]
        }

        for (let key in azan[today]) {
            // @ts-ignore
            obj[key] = azan[today][key].slice(0, -6)
        }
    }

    return <ITimings>obj
}


function sortData(data: ITimings): any[] {
    const arr = []
    for (let key in data) {
        // @ts-ignore
        arr.push(data[key])
    }
    return arr
}

function outPut(data: any) {
    const arr = [].concat(data, data)
    const times: NodeListOf<Element> = document.querySelectorAll('.time')

    for (let i = 0; i < times.length; i++) {
        times[i].innerHTML = arr[i]
    }
}
