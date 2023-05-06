export const getMonthDay = (date:Date) => {
    const _mouth = date.getMonth() + 1
    const _date = date.getDate()
    return `${_mouth}/${_date}`
}

export const getTime = (date:Date) => {
    const _hours = date.getHours()
    const _minutes = date.getMinutes()
    return _minutes >= 10 ? `${_hours}:${_minutes}` : `${_hours}:0${_minutes}`
}