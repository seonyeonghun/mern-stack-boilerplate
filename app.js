const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("morgan");
const config = require('./config/key')
const { User } = require("./models/User");
const mongoose = require("mongoose");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // body-parsr 불필요, 기본탑제!

mongoose
  .connect(
    config.mongoURI
  )
  .then((res) => console.log("Mongodb 연결 성공!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.post("/api/register", async (req, res) => {
  // 회원 가입시 필요한 정보를 client에서 받아서 parse하고,
  // 이걸 db에 저장한다.
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
