const PORT = process.env.PORT || 3030;

const { exists } = require("fs");
const fs = require("fs/promises");
const path = require("path");

module.exports = async (req, res, next) => {
  let dateNow = new Date();
  let hh = dateNow.getHours();
  let mn = dateNow.getMinutes();
  let ss = dateNow.getSeconds();
  let ms = dateNow.getMilliseconds();

  hh < 10 ? (hh = "0" + hh) : hh;
  mn < 10 ? (mn = "0" + mn) : mn;
  ss < 10 ? (ss = "0" + ss) : ss;
  ms < 10 ? (ms = "0" + ms) : ms;
  ms < 100 ? (ms = "0" + ms) : ms;

  let time = "[" + hh + ":" + mn + ":" + ss + "." + ms + "]";

  await fs.appendFile(
    path.join(__dirname, "/../../logs/console.txt"),
    `${time} In ${req.socket.remoteAddress}:${PORT}${req.url} used ${req.method}\n`
  );
  console.log(
    `\n${time} In ${req.socket.remoteAddress}:${PORT}${req.url} used ${req.method}`
  );

  let existSession = req.session.user
    ? "Hay una sesiòn iniciada"
    : "No hay una sesiòn iniciada";

  let isAdmin = req.session.admin
    ? "El usuario es admin"
    : "El usuario no es admin";

  let cookieUser = req.cookies.cookieUser
    ? `El usuario de la cookie es ${req.cookies.cookieUser}`
    : "No hay un usuario en la cookie";

  console.log(existSession);
  console.log(isAdmin);
  console.log(cookieUser);
  next();
};
