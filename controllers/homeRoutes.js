const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.sendFile(__dirname + '/views/main.html');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
