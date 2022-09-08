const User = require('../model/userSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    let emailExists = await User.findOne({ email });
    if (emailExists) {
        return res.status(400).send('Email already Exists.');
    }
    const encPassword = bcryptjs.hashSync(password, 15);
    try {
      const newUser = await User.create({ name, email, password: encPassword });
      res.status(200).json({ newUser, message: 'User Successfully Registered'});
    } catch (error) {
      next({ status: 500, message: error.message });
    }
};

// login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next({ status: 404, message: 'Email does not exist!' });
    }
    // checking the password from the payload
    const dbPwd = user.password;
    const isSamePassword = await bcryptjs.compare(password, dbPwd);
    if (isSamePassword) {
      // sending jwt token
      const jsonPayload = { name: user.name, id: user._id, email: user.email };
      const token = jwt.sign(jsonPayload, process.env.SECRET_KEY, { expiresIn: '3d' });
      res.json({ message: 'Login success', token });
    } else {
      next({ status: 404, message: 'Password is wrong' })
    }
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};


module.exports = {registerUser, loginUser};