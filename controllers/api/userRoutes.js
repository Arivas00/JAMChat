const router = require('express').Router();
const { User, Profile } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const profile = await Profile.create(); //creates profile
    userData.setProfile(profile); //associates foreign key with user. Set is one to one association where add is one to many
    if (req.body.profile) {
      profile.update({ bio: req.body.profile });
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect user name, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/lookup', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect user name, please try again' });
      return;
    }
    const profile = await userData.getProfile();
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
