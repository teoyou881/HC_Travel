// help to extract year, month, and day from Date format .
function changeDateFormat(date) {
    date = date.setMonth(date.getMonth());
    const year = new Date(date).toISOString().slice(0, 4);
    const month = new Date(date).toLocaleDateString("en-CA", { month: "short" });
    const day = new Date(date).toISOString().slice(8, 10);

    return [year, month, day];
}
module.exports = { changeDateFormat };
