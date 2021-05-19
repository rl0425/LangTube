const { User } = require("../models/user");

/** 인증절차를 토큰 비교를 통하여 처리 */
const authenticate = (req, res, next) => {
    var token = req.header("x-auth");
    User.findUserByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        } else {
            req.user = user;
            req.token = token;
            next();
        }
    }).catch((error) => {
        res.status(401).send();
    });
}

module.exports = authenticate;