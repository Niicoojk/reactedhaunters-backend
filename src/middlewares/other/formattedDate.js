let date = new Date();
let dd = date.getUTCDate();
let mm = date.getUTCMonth();
let yyyy = date.getUTCFullYear();
let hh = date.getUTCHours();
let mn = date.getUTCMinutes();
let ss = date.getUTCSeconds();
let ms = date.getUTCMilliseconds();

if (dd < 10) {
	dd = "0" + dd;
}
if (mm < 10) {
	mm = "0" + mm;
}
if (hh < 10) {
	hh = "0" + hh;
}
if (mn < 10) {
	mn = "0" + mn;
}
if (ss < 10) {
	ss = "0" + ss;
}
if (ms < 10) {
	ms = "0" + ms;
}

let formattedDate = yyyy + mm + dd + hh + mn + ss + ms + "";

module.exports = formattedDate;
