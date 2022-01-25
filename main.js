const readline = require('readline/promises');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const currentMonth = new Date(new Date().toDateString()).getMonth();
const currentYear = new Date(new Date().toDateString()).getFullYear();

function monthToString(date){
    let formatDate = date.split('.').reverse().join('-')

    return new Date(formatDate).getMonth() + 1;
}

function dayToString(date){
    let formatDate = date.split('.').reverse().join('-')
    return new Date(formatDate).toDateString().slice(8,10);
}

function yearToString(date){
    let formatDate = date.split('.').reverse().join('-')
    return new Date(formatDate).getFullYear();
}


function plural(count) {
    let n = Math.abs(count);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return `${count} год`;
    }
    n %= 10;
    if (n === 1) {
        return `${count} год`;
    }
    if (n >= 2 && n <= 4) {
        return `${count} года`;
    }
    return `${count} год`;
}






plural(1, 'банан', 'банана', 'бананов')
plural(2, 'апельсин', 'апельсина', 'апельсина')
plural(5, 'задача', 'задачи', 'задач')




fs.createReadStream('employers.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {


    let horizont = currentMonth + 11

    let birthdayDate = results.reduce(function (dateOfBirth, employeers){
        let employeersMonth = monthToString(employeers.Birthday)

        if (dateOfBirth[employeersMonth - 1]){
            dateOfBirth[employeersMonth - 1].push(employeers)
        } else {
            dateOfBirth[employeersMonth - 1] = [employeers]
        }

        return dateOfBirth
    }, {})
    
    for (let month in birthdayDate){
        
        if (month<=horizont){
            if(birthdayDate[month])
            console.log(`${monthName[month]} ${currentYear}`)
        birthdayDate[month].map(el =>{
            console.log(`(${dayToString(el.Birthday)}) - ${el.Name} (${plural(currentYear - yearToString(el.Birthday))})`)
        })
                    
        }
    }
});