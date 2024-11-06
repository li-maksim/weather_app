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
        } else {
            console.table(report)
        }
    }

    const input = document.querySelector('#location_input')
    const btn = document.querySelector('#location_btn')
    const errorMsg = document.querySelector('.error_msg')

    const search = function(evt) {
        evt.preventDefault()

        if (input.checkValidity()) {
            errorMsg.textContent = ''
            let city = input.value
            showReport(city)
            input.value = ''
        } else {
            errorMsg.textContent = 'Please enter correct location'
        }

    }

    btn.addEventListener('click', search)

    return {showReport}
})()



const Minsk = function() {
    Display.showReport('Minsk')
}

Minsk()