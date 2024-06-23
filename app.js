const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

const bookRouter = require('./routes/books');
const userRouter = require('./routes/users'); // 사용자 라우트 추가

// MongoDB 연결
mongoose.connect(
  'mongodb+srv://ut-node:1234@ut-node.ny8ugbl.mongodb.net/?retryWrites=true&w=majority&appName=UT-NODE',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// 미들웨어 설정
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 라우트 설정
app.use('/books', bookRouter);
app.use('/users', userRouter); // 사용자 라우트 추가

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.redirect('/books');
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
