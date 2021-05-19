/** BackEnd 디렉토리를 대표하는 역할*/

const express = require("express");   // 웹서버 기능과 파일 또는 데이터 가공을 가능하게 해주는 모듈 (api 설게 도와줌)
const app = express();
const bodyParser = require("body-parser");
const { mongoose } = require("./database/database");
const userController = require("./controllers/userController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use("/user", userController);

const port = 3333;   // 포트 번호

app.listen(port, () => {
    console.log("Server is running on port 3333");
});