// Your code here

function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesInfo) {
    return employeesInfo.map(employeeInfo => createEmployeeRecord(employeeInfo))
}

function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date)
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
    return totalWages
}

function calculatePayroll(employees) {
    const totalWages = employees.reduce((total, employee) => total + allWagesFor(employee), 0)
    return totalWages
}
