const { bold } = require("./bars");

const consoleError = (error) => {
	return console.log(
		`${bold}	Acá arranca el tema${bold}${error}${bold}	Acá termina el tema${bold}`
	);
};

module.exports = consoleError;
