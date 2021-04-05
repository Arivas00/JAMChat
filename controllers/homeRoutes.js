const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('login');
});

router.get('/chat', (req, res) => {
  res.render('chat');
});
router.get('/create', (req, res) => {
  res.render('create');
});
module.exports = router;
