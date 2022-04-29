import moment from "moment"

const formatDate = (date: string | undefined, format: string = 'DD/MM/YYYY'): string => {
    
    if (format != 'DD/MM/YYYY')
    return moment(date).local().format(format)
    
    const diffDays = moment(date).diff(moment(), 'days')
    
    if (diffDays >= 7)
        return moment(date).local().format(format)
    else if (diffDays < 1)
        return moment(date).local().fromNow()
    else if (diffDays < 7)
        return diffDays + 'days ago'
    else
        return ''
}

export default formatDate