import './style.css'
// import { getData } from './script_modules/logic.js'

const report = {}

const getReport = async function(location) {
    const resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KWEZ732TPU3Y92EY4JUZLPFH2`, {mode: 'cors'})
    const data = await resp.json()
    report.address = await data.address
    report.temp = await data.currentConditions.temp
    report.conditions = await data.currentConditions.conditions
    report.precip = await data.currentConditions.preciptype
}

const Display = (() => {

    const showReport = async function(location) {
        await getReport(location)
        console.table(report)
    }

    const input = document.querySelector('#location_input')
    const btn = document.querySelector('#location_btn')

    const search = function(evt) {

        evt.preventDefault()
        let city = input.value
        showReport(city)
        input.value = ''

    }

    btn.addEventListener('click', search)

    return {showReport}
})()



const Minsk = function() {
    Display.showReport('Minsk')
}

Minsk()