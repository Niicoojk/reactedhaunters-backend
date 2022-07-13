const handler = (req, res, next) => {
	let { user } = req.session;
	if (user.admin === 1 || user.admin === true) {
		return next();
	} else {
		return res.redirect("/user/login");
	}
};

module.exports = handler;
