function createEmployeeRecord([first, last, position, hourlyPayRate]) {
  let employee = {
    firstName: first,
    familyName: last,
    title: position,
    payPerHour: hourlyPayRate,
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

function createEmployeeRecords(arrayOfRecords) {
  let employeeRecords = arrayOfRecords.map(record => createEmployeeRecord(record))
  return employeeRecords
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hours] = dateStamp.split(' ')

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hours),
    date
  })
  return employee
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hours] = dateStamp.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hours),
    date
  })
  return employee
}

function hoursWorkedOnDate(employee, targetDate) {
  let clockedIn = employee.timeInEvents.find(event => event.date === targetDate)
  let clockedOut = employee.timeOutEvents.find(event => event.date === targetDate)
  let hoursWorked = (clockedOut.hour - clockedIn.hour)/100
  return hoursWorked
}

function wagesEarnedOnDate(employee, targetDate) {
  let hoursWorked = hoursWorkedOnDate(employee, targetDate)
  let payForWork = hoursWorked * employee.payPerHour
  return payForWork
}

function allWagesFor(employee) {
  let payForWork = employee.timeInEvents.map(timeEvent => wagesEarnedOnDate(employee, timeEvent.date))
  // let payForWork = [];
  // for(let i = 0; i < employee.timeInEvents.length; i++) {
  //   payForWork.push(wagesEarnedOnDate(employee, employee.timeInEvents[i].date)) 
  // }
  return payForWork.reduce((previousValue, currentValue) => previousValue + currentValue)
}

function calculatePayroll(multipleEmployees) {
  let allWages = multipleEmployees.map(employee => allWagesFor(employee))
  return allWages.reduce((pV, cV) => pV + cV)
}