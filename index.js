function createEmployeeRecord(array){
    const obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
    return obj
}

function createEmployeeRecords(arrays){  
   return arrays.map(element => createEmployeeRecord(element))
}
   
function createTimeInEvent(obj, dateStamp){

        obj.timeInEvents[0] = {
            type: "TimeIn",
            hour: parseInt(dateStamp.slice(-4)),
            date: dateStamp.slice(0,10)
        } 
    return obj
}

function createTimeOutEvent(obj, dateStamp){
    
    obj.timeOutEvents[0] = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    }
 
    return obj
}

function hoursWorkedOnDate(obj, date){
  const enter = obj.timeInEvents.find(element => element.date === date)
  const leave = obj.timeOutEvents.find(element => element.date === date)
  return (leave.hour - enter.hour) / 100
}

function wagesEarnedOnDate(obj, date){
    return hoursWorkedOnDate(obj, date) * obj.payPerHour
    
}

function allWagesFor(obj) {
    let allWages = obj.timeInEvents.map(element => wagesEarnedOnDate(obj, element.date))
    let total = 0
    allWages.forEach(element => total = element + total)
    return total * 7
  }

function calculatePayroll(arrays){
    let sum =  arrays.reduce((accumulator, currentValue) => {return(accumulator + allWagesFor(currentValue))}, 0)
   return sum
}
