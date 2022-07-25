const db = require("../../database/models");

module.exports = async (req, res, next) => {
  let cookieUser = req.cookies.cookieUser ? req.cookies.cookieUser : undefined;

  let userFromCookie;

  if (cookieUser != undefined) {
    let userModify = (anyUser) => {
      let user = {
        user_id: anyUser.user_id,
        user_name: anyUser.user_name,
        image: anyUser.image,
      };

      return (anyUser = user);
    };

    let user = await db.User.findOne({
      where: { user_id: cookieUser },
    });
    user.admin === true
      ? (req.session.admin = true)
      : (req.session.admin = false);
    user ? (userFromCookie = userModify(user)) : undefined;
  }

  if (userFromCookie != undefined) {
    req.session.user = userFromCookie;
  }

  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
  }

  next();
};
