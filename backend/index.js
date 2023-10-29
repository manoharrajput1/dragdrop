const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const sequelize = require('./conn/conn')
const User = require('./schema/cshema')
const Lschema = require('./schema/lschema');
const { where } = require('sequelize');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: '*' }))

app.use(express.urlencoded({ extended: true }))
app.get('/getdata', async (req, res) => {
  const user = await Lschema.findAll()
  res.send(user)
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await sequelize.sync()
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username: username } })
  if (user.password === password) {
    res.status(200).json({ message: 'Login successful' });
  }
});

app.post('/createlist', async (req, res) => {
  const { listitem } = req.body
  console.log(listitem);
  await sequelize.sync()
  const user = await Lschema.create({ listitem: [listitem] })
});
app.post('/updatelist', async (req, res) => {
  const { datas, listid, index } = req.body
  // console.log(datas, listid);
  await sequelize.sync()
  const user = await Lschema.findOne({ where: { id: listid } })
  try {
    let userdata = user.listitem
    if (datas in userdata) {
      return
    }
    else {
      userdata.push(datas)
    }
    const updatedlist = Lschema.update({ listitem: userdata }, { where: { id: listid } })

  } catch (error) {
    console.log(error);
  }
});
app.post('/deletelist', async (req, res) => {
  const { listid, index } = req.body
  console.log(listid,index);
  await sequelize.sync()
  const user = await Lschema.findOne({ where: { id: listid } })
  try {
    let userdata = user.listitem
    userdata.splice(index, 1)
    const updatedlist = Lschema.update({ listitem: userdata }, { where: { id: listid } })
  } catch (error) {
    console.log(error);
  }
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
