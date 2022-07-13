const handler = (req, res, next) => {
	let { user } = req.session;
	if (user) {
		return next();
	} else {
		return res.redirect("/user/login");
	}
};

module.exports = handler;
