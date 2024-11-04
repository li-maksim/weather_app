// class Report {
//     constructor(address, conditions, temp, wind, precip) {
//         this.address = address;
//         this.conditions = conditions;
//         this.temp = temp;
//         this.wind = wind;
//         this.precip = precip
//     }
// }

// export let data = {
//     address: '',
//     temp: ''
// }

// export const getData = ( async (location) => {

//     const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KWEZ732TPU3Y92EY4JUZLPFH2 `, {mode: 'cors'})
//     const report = await response.json()
//     data.address = await report.address
//     data.temp = await report.currentConditions.temp

//     // console.log(data)

// })

// export const Moscow = function() {
//     getData('Moscow')
//     // console.log(data)
// }

export const data = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Minsk?key=KWEZ732TPU3Y92EY4JUZLPFH2`, {mode: 'cors'})
    .then(response => response.json())
        .then((response) => {
            return response
        })