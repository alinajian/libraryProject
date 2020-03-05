
const controller = {};
const User = require('../model/User');

controller.getUser = async (req, res) => {
  const { user: id } = req.query;
  if (id) {
    try {
      const foundUser = await User.findById(id);
      res.send(foundUser);
    } catch (e) {
      res.send('ERROR GETTING USER');
    }
  } else {
    res
      .status(500)
      .send({
        status: 500,
        msg: 'Please provide user id',
        data: {}
      })
  }
}

controller.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (E) {
    console.log(E);
    res.send('ERROR \n', E);
  }
};

controller.storeUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log(req.body)
    if (!password || !email) {
      res.send({
        status: false,
        msg: 'Please provide the correct data'
      });
    } else if (password.length < 6) {
      return res.send({
        status: false,
        msg: 'Password must be at least 6 characters'
      });
    }
    else {
      const newUser = await new User(req.body).save();
      res.send(newUser);
    }
  } catch (e) {
    res.send(e);
  }
}


controller.editUser = async (req, res) => {
  //Process avatar file name
  const { id } = req.params;

   const avatar =   req.file ?  req.file.path : "";
   req.body = req.body ? req.body : {};
   req.body.avatar = avatar;
  try {
    const newUser = await User.findByIdAndUpdate(id, req.body, { upsert: true, new: true });
    res.json(newUser);
  } catch (e) {
    res.send('ERROR', e);
  }
}


controller.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (e) {
    res.send('ERROR', e);
  }
}


module.exports = controller;

