import moment from "moment"

const formatDate = (date: string | undefined, format: string = 'DD/MM/YYYY'): string => {
    let isPast: boolean = true
    const newDate = moment(date).local()
    const diffDays = moment(date).diff(moment(), 'days')

    if (newDate.isAfter(moment()))
        isPast = true

    if (format != 'DD/MM/YYYY')
        return newDate.format(format)

    if (diffDays >= 7)
        return newDate.format(format)
    else if (diffDays < 1)
        return newDate.fromNow()
    else if (diffDays < 7)
        return isPast
            ? 'in ' + diffDays + ' days'
            : diffDays + 'days ago'
    else
        return ''
}

export default formatDate