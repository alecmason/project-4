const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initialize the S3 constructor

const BUCKET = process.env.BUCKET;

module.exports = {
  signup,
  login
};

async function signup(req, res) {
  console.log(req.body, " <- req.body", req.file, " <-- req.file");
  // const user = new User(req.body);

  // define the fileName/Path on aws
  const filePath = `${uuidv4()}${req.file.originalname}`;
  const params = { Bucket: BUCKET, Key: filePath, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    // data.Location, is the url on aws,
    // if you're getting aws problems, log out the err, or the data object

    console.log(data, '<- data users controller signup')
    const user = new User({ ...req.body, photoUrl: data.Location });

    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  });
}

// using EMAIL
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user); // creating jwt step 2 Flow of Token Based auth
        res.json({ token }); // returniing the jwt to the browser/to the client Step 3
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: '24h' }
  );
}
