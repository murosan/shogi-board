const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: '将棋 検討盤' });
});

module.exports = router;
