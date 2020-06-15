export default function formatTime(date) {

    var d = new Date(date),
        currentDate = d.toISOString().substr(0, 10),
        // month = '' + (d.getMonth() + 1),
        // day = '' + d.getDate(),
        hours = ''  + d.getHours(),
        min = '' + d.getMinutes();
        // year = d.getFullYear();
    const [year, month, day] = currentDate.split('-');

    // if (month.length < 2) month = '0' + month;
    // if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (min.length < 2) min = '0' + min;

    const oneDay = 24 * 60 * 60 * 1000;

    const isMoreThanADay = (new Date().getTime() - d.getTime()) >= oneDay;

    const isDateGreaterThanCurrent = date => parseInt(date) < parseInt(new Date().getFullYear());

    if (isMoreThanADay && !isDateGreaterThanCurrent(date) ) {
        return `${day}.${month} ${hours}:${min}`
    } else if (isMoreThanADay && isDateGreaterThanCurrent(date)) {
        return `${day}.${month}.${year} ${hours}:${min}`
    } else {
        return `${hours}:${min}`
    }

}