// Your code here
function createEmployeeRecord(array){
    const employee = {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: [] }
    return employee
}

function createEmployees (array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent (employee, date) {
    let dateArray = date.split(" ")
    employee.timeInEvents.push({type: "TimeIn", hour: parseInt(dateArray[1]), date: dateArray[0]})
    return employee
}

function createTimeOutEvent (employee, date){
    let dateArray = date.split(" ")
    employee.timeOutEvents.push({type: "TimeOut", hour: parseInt(dateArray[1]), date: dateArray[0]})
    return employee
}

function hoursWorkedOnDate (employee, date){
    let timeIn = employee.timeInEvents.find(function(object) {return object.date === date})
    let timeOut = employee.timeOutEvents.find(function(object) {return object.date === date})
    let hours = timeOut.hour - timeIn.hour
    return hours/100
}

function wagesEarnedOnDate (employee, date){
    let hours = hoursWorkedOnDate (employee, date)
    return hours * employee.payPerHour
}

function allWagesFor (employee){
    return employee.timeInEvents.reduce(function(a,b){
        return a + wagesEarnedOnDate(employee, b.date)
    },0)
}

function createEmployeeRecords (array){
    return array.map(createEmployeeRecord)
}

function findEmployeebyFirstName (srcArray, firstName){
    return srcArray.find(function(object) {return object.firstName === firstName})
}

function calculatePayroll (array){
    return array.reduce (function(a,b){
        return a + allWagesFor(b)
        }, 0)
}