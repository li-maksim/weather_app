import './style.css'
// import { getData } from './script_modules/logic.js'

const getData = async function(location) {
    const resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KWEZ732TPU3Y92EY4JUZLPFH2`, {mode: 'cors'})
    return resp.json()
}

const report = {}

const getReport = async function(location) {
    const data = await getData(location)
    report.address = await data.address
    report.temp = await data.currentConditions.temp
}

const display = async function(location) {
    await getReport(location)
    console.table(report)
}

const Minsk = function() {
    display('Minsk')
}

Minsk()