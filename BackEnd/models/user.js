/** mongoose 모델을 제어하는 파일 */

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");   // 토큰을 생성하고 해제하기 위한 모듈
const _ = require("lodash");
const bcrypt = require("bcrypt");   // 비밀번호 해시 모듈

const Schema = mongoose.Schema;

/** mongoose를 이용한 스키마 구성 */
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        index: true,
        required: true,
        minlength: 6
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

mongoose.set('useCreateIndex', true)

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    return _.pick(userObject, ["_id", "email", "name", "password"]);
}

/** 토큰 생성 */
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = "auth";

    const token = jwt.sign({ _id: user._id.toHexString(), access }, 'ASDASA1221DASDA').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
}

/** 입력받은 이메일과 비밀번호를 데이터베이스에 조회 */
UserSchema.statics.findUserByCredentails = function (email, password) {
    const User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        } else {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        resolve(user);
                    } else {
                        reject();
                    }
                })
            })
        }
    });
}

/** 토큰을 통한 데이터 조회 */
UserSchema.statics.findUserByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, "ASDASA1221DASDA");
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        "_id": decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    });
}

/** 비밀번호를 해쉬화 */
UserSchema.pre("save", function (next) {
    const user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
})

UserSchema.methods.removeToken = function (token) {
    const user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    });
}
const User = mongoose.model('UserDB', UserSchema);

module.exports = { User };