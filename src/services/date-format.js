export default function changeDateFormat(date) {
  let myDate = new Date(date);
  let day = myDate.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let year = myDate.getFullYear();
  let formattedDate = day + " " + months[myDate.getMonth()] + " " + year;
  return formattedDate;
}
