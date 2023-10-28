function ordinalSuffix(i) {
    const j = i % 10,
          k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

function unixToFormattedDate(unixTimestamp) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds by multiplying with 1000

    const day = ordinalSuffix(date.getDate());
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2); // Ensure two digits
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, it should be 12

    return `${day} ${month}, ${year} ${hours}:${minutes}${ampm}`;
}

export { ordinalSuffix, unixToFormattedDate };
