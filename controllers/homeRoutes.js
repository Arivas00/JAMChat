const router = require('express').Router();
const { Profile, User } = require('../models');
const withAuth = require('../utils/auth');

//homepage route
router.get('/', async (req, res) => {
  res.render('login');
});

router.get('/users', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Profile }],
    });

    const user = userData.get({ plain: true });

    res.render('chat', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

//chat page route
router.get('/chat', withAuth, (req, res) => {
  if (req.session.logged_in) {
    res.render('chat');
  } else {
    res.redirect('/login');
  }
});

//signup page route
router.get('/create', (req, res) => {
  res.render('create');
});

//profile route
router.get('/profile', withAuth, (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
  }
  res.render('login');
});

router.get('/user', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Profile }],
    });

    const user = userData.get({ plain: true });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
