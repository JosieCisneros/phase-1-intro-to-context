
function createEmployeeRecord([firstName, familyName, title, payPerHour]) { 
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,

        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord) 
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt((dateStamp).split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }

    employeeRecord.timeInEvents.push(timeInEvent)

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt((dateStamp).split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }

    employeeRecord.timeOutEvents.push(timeOutEvent)

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === date)
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === date)

    const hoursWorked = (timeOut.hour - timeIn.hour)/100

    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const wagesOnDate = employeeRecord.payPerHour * hoursWorked

    return wagesOnDate
}

function allWagesFor(employeeRecord) {
    const allDates = employeeRecord.timeInEvents.map(e => e.date)
    const allWages = allDates.map(date => wagesEarnedOnDate(employeeRecord, date))
    const totalWages = allWages.reduce((total, wagesOnDate) => (total + wagesOnDate), 0)
    return totalWages
}

function calculatePayroll(employeeRecords) {
    const payroll = employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0)
    return payroll
}



