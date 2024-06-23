const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// 회원가입
router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', userController.register);

// 로그인
router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', userController.login);

// 로그아웃
router.get('/logout', userController.logout);

module.exports = router;
