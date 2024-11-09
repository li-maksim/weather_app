import './style.css'
// import { getData } from './script_modules/logic.js'

const report = {}

const getReport = async function(location) {

    const locationArr = location.split('')
    locationArr[0] = locationArr[0].toString().toUpperCase()
    for (let i = 0; i < locationArr.length; i++) {
        if (locationArr[i] == ' ') {
            locationArr[i] = '-'
        }
    }
    const locationStr = locationArr.join('')

    try {
        const resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationStr}?key=KWEZ732TPU3Y92EY4JUZLPFH2`, {mode: 'cors'})
        const data = await resp.json()
        report.address = await data.resolvedAddress
        report.temp = await data.currentConditions.temp
        report.conditions = await data.currentConditions.conditions
        report.precip = await data.currentConditions.preciptype
        report.celcius = false
    } catch {
        console.log('Oops!')
        return Error
    }
}

const Display = (() => {

    const showReport = async function(location) {
        const currentReport = await getReport(location)
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

    const show = function() {

        const addressP = document.createElement('p')
        const tempP = document.createElement('p')
        const descrP = document.createElement('p')
        const precipP = document.createElement('p')

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
        reportDiv.appendChild(addressP)
        reportDiv.appendChild(tempP)
        reportDiv.appendChild(descrP)
        reportDiv.appendChild(precipP)

        input.value = ''
    }

    const search = async function(evt) {
        evt.preventDefault()
        let city = input.value
        const re = new RegExp("^([a-zA-Z\\-\\s+]{1,})$")

        if (re.test(city)) {
            errorMsg.textContent = ''
            await showReport(city)

            if (report.address != '') {
                show()
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

        const toCelcius = function() {
            report.celcius = true
            show()
            CBtn.classList.add('clicked')
            FBtn.classList.remove('clicked')
        }

        const toFahrenheit = function() {
            report.celcius = false
            show()
            FBtn.classList.add('clicked')
            CBtn.classList.remove('clicked')
        }

        return { toCelcius, toFahrenheit }

    })()

    CBtn.addEventListener('click', convert.toCelcius)
    FBtn.addEventListener('click', convert.toFahrenheit)

    return {showReport}
})()



const Minsk = function() {
    Display.showReport('Minsk')
}

Minsk()