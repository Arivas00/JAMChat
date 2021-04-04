const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('login');
});

router.get('/chat', (req, res) => {
  res.render('chat');
});
module.exports = router;
