/** 데이터베이스와 통신해 결과에 응답하는 역할 */

const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const authenticate = require("../middlewares/authenticate");

/** 회원가입 요청에 대한 응답 */
router.post("/create", (req, res) => {
    console.log(req.body);
    
    /** 사용자가 입력한 데이터 */
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const user = new User(userData);

    user.save().then((user) => {
        if (user) {
            return user.generateAuthToken();
        } else {
            res.sendStatus(400);
        }
    }).then((token) => {
        res.header({ "x-auth": token }).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

/** 로그인 요청에 대한 응답 */
router.post("/login", (req, res) => {
    User.findUserByCredentails(req.body.email, req.body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header({ "x-auth": token }).send(user);
        })
    });
});

/** 로그아웃 요청에 대한 응답 */
router.delete("/logout", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send("user logged out");
    }).catch(() => {
        res.status(401).send();
    });
});

router.get("/user", authenticate, (req, res) => {
    res.send(req.user);
});

module.exports = router;