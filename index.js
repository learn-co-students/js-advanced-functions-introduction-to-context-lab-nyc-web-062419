
function createEmployeeRecord(bullshit){
  return {
    firstName: bullshit[0],
    familyName: bullshit[1],
    title: bullshit[2],
    payPerHour: bullshit[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployees(aPileOfBullshit)
{
  return aPileOfBullshit.map(bullshit => {
    return createEmployeeRecord(bullshit)
  });
}

function createTimeInEvent(employee, dateStamp){
  let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp){
  let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    })

    return employee
}

function hoursWorkedOnDate(employee , soughtDate){
  let inEvent = employee.timeInEvents.find(function(e){
    return e.date === soughtDate
})

let outEvent = employee.timeOutEvents.find(function(e){
    return e.date === soughtDate
})
return (outEvent.hour - inEvent.hour) / 100
}



function wagesEarnedOnDate(employee, soughtDate){
return hoursWorkedOnDate(employee , soughtDate) * employee.payPerHour
}

let allWagesFor = function(employee){
  debugger
  let eligibleDates = employee.timeInEvents.map(function(e){
      return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor(rec)
  }, 0)
}

let createEmployeeRecords = function(src) {
  return src.map(function(row){
    return createEmployeeRecord(row)
  })
}

let findEmployeebyFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "44-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "44-03-14 2100")
// Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "44-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "44-03-15 1100")
// 324 + 54
expect(allWagesFor(cRecord)).to.equal(378)