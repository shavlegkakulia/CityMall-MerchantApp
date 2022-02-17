export const formatNumber = (number: any) => {
    let formattedNumber = parseFloat(number);
    return formattedNumber
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};


export const formatDate = (dateString: string) => {
    if (!dateString) return "";
    let dateObj = new Date(dateString);
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let time = dateString.split('T')[1].slice(0, 5)
    console.log('time', time)
    let newdate =
        ("0" + day).slice(-2) +
        "." +
        ("0" + month).slice(-2) +
        "." +
        year +
        " " + 
        time
    return newdate;
};