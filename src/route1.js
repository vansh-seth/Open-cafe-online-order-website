const express = require("express");
const router = express.Router();
const record = require("./Model1");

router.use((req, res, next) => {
  console.log('Middleware executed');
  next(); 
});

router.get('/', (req, res) => {
  res.send('Hello from routerModule');
});

// Ensure this route handles POST requests and is located at `/api/userData`
router.post('/api/userData', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await record.findOne({ email });
    if (user) {
      res.json({ name: user.name });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/create', (req, res) => {
  const { name, password, email } = req.body;
  const newSchema = new record({
    name,
    password,
    email
  });

  newSchema.save()
    .then(savedRecord => {
      res.json(savedRecord); 
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await record.findOne({ email });
    if (user && user.password === password) {
      res.json('exist');
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

router.post("/Signup", async (req, res) => {
  const { name, password, email } = req.body;

  const data = {
    name: name,
    password: password,
    email: email,
  };
  try {
    const check = await record.findOne({ email });
    if (check) {
      res.json('exist');
    } else {
      await record.insertMany([data]);
      res.json("notexist");
    }
  } catch (e) {
    console.error(e);
    res.json("notexist");
  }
});

module.exports = router;
