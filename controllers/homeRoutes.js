const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('chat');
});

module.exports = router;
