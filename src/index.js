import './style.css'
// import { getData } from './script_modules/logic.js'

const report = {}

const getReport = async function(location) {
    try {
        const resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KWEZ732TPU3Y92EY4JUZLPFH2`, {mode: 'cors'})
        const data = await resp.json()
        report.address = await data.address
        report.temp = await data.currentConditions.temp
        report.conditions = await data.currentConditions.conditions
        report.precip = await data.currentConditions.preciptype
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

    const search = async function(evt) {
        evt.preventDefault()
        let city = input.value
        const re = new RegExp("^([a-zA-Z]{1,})$");

        if (re.test(city)) {
            errorMsg.textContent = ''
            await showReport(city)

            if (report.address != '') {
                const addressP = document.createElement('p')
                const tempP = document.createElement('p')
                const descrP = document.createElement('p')
                const precipP = document.createElement('p')
                reportDiv.textContent = ''
                addressP.textContent = `Location: ${report.address}`
                tempP.textContent = `Temperature: ${report.temp}`
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
            } else {
                reportDiv.textContent = ''
            }
        } else {
            errorMsg.textContent = 'Please enter correct location'
            reportDiv.textContent = ''
        }

    }

    btn.addEventListener('click', search)

    return {showReport}
})()



const Minsk = function() {
    Display.showReport('Minsk')
}

Minsk()