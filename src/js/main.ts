import {getApiAzan, getApiTimeZone} from "./api.ts";
import {ITimezone} from "./interface/ITimezone.ts";
import {IAzan, IAzanContent, ITimings} from "./interface/IAzan.ts";
import {IKeyDay} from "./interface/IKeyDay.ts";

const day = document.querySelector('.day') as HTMLElement

let cutHour: string = ''

async function azan() {
    const timezone = await getApiTimeZone('shymkent ', 'kz')
    const cutDay: string = cutDateDay(timezone)
    cutHour = cutDateHour(timezone)
    // console.log(cutHour)
    day.innerHTML = cutDay
    const array: number[] = getYearAndMonth(timezone)

    const azanData = await getApiAzan(array[0],array[1],'shymkent', 'kz')
    const keyDayObj: IKeyDay = keyDay(azanData)

    const today = todayAzan(cutDay, keyDayObj)
    const sortTime = sortData(today)
    outPut(sortTime)
    dynamicActive(sortTime)
}
azan()


function cutDateDay(day: ITimezone): string {
    return day.date_time_wti.slice(5, -15)
}

function cutDateHour(day: ITimezone): string {
    return day.time_24.slice(0, -3)
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

    return obj
}


function sortData(data: ITimings): any[] {
    const arr = []
    for (let key in data) {
        // @ts-ignore
        arr.push(data[key])
    }
    return arr
}

const timeItem: NodeListOf<HTMLElement> = document.querySelectorAll('.time-item')

function outPut(data: any) {
    const times: NodeListOf<HTMLElement> = document.querySelectorAll('.time')

    for (let i = 0; i < times.length; i++) {
        times[i].innerHTML = data[i]
        timeItem[i].id = data[i]
    }
}

const picture: Element | null = document.querySelector('.picture')

function dynamicActive(sorted: any) {
    let index = 0
    for (let i = 1; i < sorted.length; i++) {
        let timeId1 = timeItem[index].id.split(':')
        let timeNow = cutHour.split(':')
        let timeId2 = timeItem[i].id.split(':')

        let pastTime = new Date().setHours(+timeId1[0], +timeId1[1])
        let simpleTime = new Date().setHours(+timeNow[0], +timeNow[1])
        let futureTime = new Date().setHours(+timeId2[0], +timeId2[1])

        if(pastTime < simpleTime && !(simpleTime > futureTime)) {
            // @ts-ignore
            document.getElementById(timeItem[index].id).classList.add('active')
            // @ts-ignore
            let str: string = timeItem[index].attributes.getNamedItem('data-bg').value
            // @ts-ignore
            picture.classList.add(str)
        }
        index++
    }

}

