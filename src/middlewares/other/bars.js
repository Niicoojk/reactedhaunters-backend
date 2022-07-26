const bars = {
	bold: "\n==================================\n",
	boldAlert: (x) => {
		console.log(`${this.bold}${x}${this.bold}`);
	},
	light: "\n----------------------------------\n",
	lightAlert: (x) => {
		console.log(`${this.light}${x}${this.light}`);
	},
};
module.exports = bars;
