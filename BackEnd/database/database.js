/** mongo 데이터베이스와 서버의 연결 */

const mongoose = require("mongoose");

const mongodb_url = "mongodb+srv://new-user-01:ehqls1950@rangtube.naiaz.mongodb.net/<dbname>?retryWrites=true&w=majority";

//const mongodb_url = "mongodb+srv://new-user-02:abcd0123@rangtube.naiaz.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { mongoose };