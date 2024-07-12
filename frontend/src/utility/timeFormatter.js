export const formatter = (time) =>{
    const date = new Date(time)
    const formattedDate = date.toLocaleDateString('en-GB');
    return formattedDate.replace(/\//g, '-')
}