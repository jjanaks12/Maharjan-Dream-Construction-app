export function abbr(str: string): string {
    return str
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
}