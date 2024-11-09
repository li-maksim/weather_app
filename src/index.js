import './style.css'
// import { getData } from './script_modules/logic.js'

const report = {}

const getData = async function (location) {

    const locationArr = location.split('')
    locationArr[0] = locationArr[0].toString().toUpperCase()
    for (let i = 0; i < locationArr.length; i++) {
        if (locationArr[i] == ' ') {
            locationArr[i] = '-'
        }
    }
    const locationStr = locationArr.join('')

    try {
        const resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationStr}?key=KWEZ732TPU3Y92EY4JUZLPFH2`, { mode: 'cors' })
        const data = await resp.json()
        report.address = await data.resolvedAddress
        report.temp = await data.currentConditions.temp
        report.conditions = await data.currentConditions.conditions
        report.precip = await data.currentConditions.preciptype
        if (report.celcius === true) {
            report.celcius = true
        } else {
            report.celcius = false
        }
    } catch {
        console.log('Oops!')
        return Error
    }
}

const Display = (() => {

    const getReport = async function (location) {
        const currentReport = await getData(location)
        if (currentReport == Error) {
            console.log('Wrong location I guess')
            report.address = ''
            report.temp = ''
            report.conditions = ''
            report.precip = ''
        } else {
            console.table(report)
        }
    }

    const input = document.querySelector('#location_input')
    const btn = document.querySelector('#location_btn')
    const errorMsg = document.querySelector('.error_msg')
    const reportDiv = document.querySelector('.report_div')

    const showReport = function () {

        const addressP = document.createElement('p')
        const tempP = document.createElement('p')
        const descrP = document.createElement('p')
        const precipP = document.createElement('p')
        const img = document.createElement('img')

        reportDiv.textContent = ''
        addressP.textContent = `Location: ${report.address}`
        if (report.celcius === false) {
            tempP.textContent = `Temperature: ${report.temp}`
        } else {
            tempP.textContent = `Temperature: ${Math.round(((report.temp - 32) * (5 / 9)) * 100) / 100}`
        }
        descrP.textContent = `Current conditions: ${report.conditions}`
        if (report.precip != null) {
            precipP.textContent = `Precipitation: ${report.precip.toString()}`
        } else {
            precipP.textContent = `Precipitation: none`
        }

        if (report.conditions.includes('cloudy') ||
            report.conditions.includes('Overcast') ||
            report.conditions.includes('Cloudy')) {
            img.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTE2czIzcXdzdjdnNDA3ZTRjeHFmbDBpa2p2bmJ5N3BjdmR2cXhqcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yB3gwsCaymSglI1Jqt/giphy-downsized-large.gif'
        } else if (report.conditions.includes('sunny') ||
            report.conditions.includes('Sunny') ||
            report.conditions.includes('sun') ||
            report.conditions.includes('Sun')) {
            img.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTQ1bWFiNTA3aHFwd2pmeWhkOG1wbzJkajU4cmZvdDJvcWhxbDh2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HvYdoLbPqSdNu/giphy.gif'
        } else if (report.conditions.includes('clear') ||
            report.conditions.includes('Clear')) {
            img.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG5mMzVkdTY4a2k1cjNwcW8yMDliaXZ6YjFpNjhkdHRqZjc1b28zbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xwT20ApeHadTlS/giphy-downsized-large.gif'
        }
        else if (report.conditions.includes('rain') ||
            report.conditions.includes('Rain') ||
            report.conditions.includes('rainy') ||
            report.conditions.includes('Rainy')) {
            img.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGFqamFtdWU3cGVlOGZxaG5iYTBma3Byd2xnOXFlNTk5NW9ydTR5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2ir9TVxVFOcDzMAzB/giphy.gif'
        } else if (report.conditions.includes('snow') ||
            report.conditions.includes('Snow') ||
            report.conditions.includes('snowy') ||
            report.conditions.includes('Snowy')) {
            img.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGphNWhxMnIzbWphY2hnaThjYXphdXBpb29wZzBoaWk2cW5pZHV0byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FL4IWDUYp0y6kTK/giphy.gif'
        } else {
            img.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2RydGtka3ZhOGtrZHp0cnZ6aDI1YXl6aXppamx0bzdpcjg1NnYyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7fj4un4Rd4YTK/giphy.gif'
        }

        reportDiv.appendChild(addressP)
        reportDiv.appendChild(tempP)
        reportDiv.appendChild(descrP)
        reportDiv.appendChild(precipP)
        reportDiv.appendChild(img)

        input.value = ''
    }

    const search = async function (evt) {
        evt.preventDefault()
        let city = input.value
        const re = new RegExp("^([a-zA-Z\\-\\s+]{1,})$")

        if (re.test(city)) {
            errorMsg.textContent = ''
            await getReport(city)

            if (report.address != '') {
                showReport()
            } else {
                reportDiv.textContent = ''
            }
        } else {
            errorMsg.textContent = 'Please enter correct location'
            reportDiv.textContent = ''
        }

    }

    btn.addEventListener('click', search)


    const CBtn = document.querySelector('#C')
    const FBtn = document.querySelector('#F')

    const convert = (() => {

        const toCelcius = function () {
            report.celcius = true
            showReport()
            CBtn.classList.add('clicked')
            FBtn.classList.remove('clicked')
        }

        const toFahrenheit = function () {
            report.celcius = false
            showReport()
            FBtn.classList.add('clicked')
            CBtn.classList.remove('clicked')
        }

        return { toCelcius, toFahrenheit }

    })()

    CBtn.addEventListener('click', convert.toCelcius)
    FBtn.addEventListener('click', convert.toFahrenheit)

    return { getReport }
})()