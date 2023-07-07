import {getApiAzan, getApiGeolocation, getApiTimeZone} from "./api.ts";
import {IAzan, IAzanContent, ITimings} from "./interface/IAzan.ts";
import {IKeyDay} from "./interface/IKeyDay.ts";


const day = document.querySelector('.day') as HTMLElement
const city = document.querySelector('.city') as HTMLElement
const search = (document.querySelector('.search') as HTMLInputElement)

const mainContent = document.querySelector('.main__content') as HTMLElement
const loadingPage = document.querySelector('.loading-page') as HTMLElement

let cityGeo: string
let countryGeo: string

async function getGeo() {
    const geolocation = await getApiGeolocation()
    cityGeo = geolocation.city
    countryGeo = geolocation.country_code2
    search.value = `${cityGeo} ${countryGeo}`
    getTimeZone()
}

getGeo()

search.addEventListener('keydown', handleEnter)
function handleEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
        e.preventDefault();
        let arr: string[] = search.value.split(' ')
        cityGeo = arr[0]
        countryGeo = arr[1]

        if (cityGeo === '' || countryGeo === undefined) {
            return
        }
        mainContent.style.display = 'none'
        loadingPage.style.display = 'block'
        getTimeZone()
    }
}


let cutDay: string
let cutHour: string
let arrayYearAndMonth: number[]

async function getTimeZone() {
    const timezone = await getApiTimeZone(cityGeo, countryGeo)

    cutDay = timezone.date_time_wti.slice(5, -15)
    cutHour = timezone.time_24.slice(0, -3)
    arrayYearAndMonth = [timezone.year, timezone.month]
    day.innerHTML = timezone.date_time_wti.slice(5, -9)
    city.innerHTML = timezone.geo.city

    azan()
}


async function azan() {
    const azanData = await getApiAzan(arrayYearAndMonth[0],arrayYearAndMonth[1],cityGeo, countryGeo)

    const keyDayObj: IKeyDay = keyDay(azanData)
    const today = todayAzan(cutDay, keyDayObj)
    const sortTime = sortData(today)

    outPut(sortTime)
    dynamicActive(sortTime)
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


/* Можно ли решить ошибку при помощи generic*/
/* https://stackoverflow.com/questions/56568423/typescript-no-index-signature-with-a-parameter-of-type-string-was-found-on-ty */
function sortData(data: ITimings): string[] {
    const arr: string[] = []
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


const picture: HTMLElement = document.querySelector('.picture') as HTMLElement

function dynamicActive(sorted: any) {
    timeItem.forEach(item => {
        item.classList.remove('active')
        picture.classList.remove('one')
        picture.classList.remove('two')
        picture.classList.remove('three')
        picture.classList.remove('four')
        picture.classList.remove('five')
        picture.classList.remove('six')
    })

    let index = 0
    for (let i = 1; i < sorted.length; i++) {
        let timeId1 = timeItem[index].id.split(':')
        let timeNow = cutHour.split(':')
        let timeId2 = timeItem[i].id.split(':')

        let pastTime = new Date().setHours(+timeId1[0], +timeId1[1])
        let simpleTime = new Date().setHours(+timeNow[0], +timeNow[1])
        let futureTime = new Date().setHours(+timeId2[0], +timeId2[1])

        let dataBg: string = (timeItem[index].attributes.getNamedItem('data-bg') as Attr).value
        let dataBg1: string = (timeItem[i].attributes.getNamedItem('data-bg') as Attr).value

        if(pastTime <= simpleTime && !(simpleTime >= futureTime)) {
            timeItem[index].classList.add('active')
            picture.classList.add(dataBg)
            break
        }
        if (i === 5) {
            timeItem[i].classList.add('active')
            picture.classList.add(dataBg1)
        }
        index++
    }

    mainContent.style.display = 'block'
    loadingPage.style.display = 'none'
}
