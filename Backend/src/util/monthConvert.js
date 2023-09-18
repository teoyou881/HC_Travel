function removeLeadingZero(monthNumber) {
    if (monthNumber.startsWith("0")) {
        return monthNumber.substring(1);
    }
    return monthNumber;
}
function getMonthName(removeLeadingZero, monthNumber) {
    let monthName = removeLeadingZero(monthNumber) - 1;
    return monthName.toLocaleString("en-US", { month: "short" });
}
module.exports = { removeLeadingZero, getMonthName };
