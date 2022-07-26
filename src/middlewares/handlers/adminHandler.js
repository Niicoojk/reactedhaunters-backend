const handler = (req, res, next) => {
  let { admin } = req.session;
  if (admin === 1 || admin === true) {
    return next();
  } else {
    return res.redirect("/");
  }
};

module.exports = handler;
