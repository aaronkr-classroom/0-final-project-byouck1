const User = require('../models/user');

// 회원가입
exports.register = (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register', { error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/books');
    });
  });
};

// 로그인
exports.login = passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/users/login'
});

// 로그아웃
exports.logout = (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/books');
  });
};
