const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../views/main.html'));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
