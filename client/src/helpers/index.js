export const isShared = shared => shared ? 'Shared' : 'Entire';
export const capitalLetter = string => {
    const arr = string.split(' ');
    return arr.map(val => val.charAt(0).toUpperCase() + val.slice(1))
}