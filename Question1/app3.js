const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'XOyolORPasKWOdAN';

app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/train/trains', authenticateToken, (req, res) => {
  const trainDetails = [
    {
      trainName: 'Chennai Exp',
      trainNumber: '2344',
      departureTime: {
        Hours: 21,
        Minutes: 35,
        Seconds: 0,
      },
      seatsAvailable: {
        sleeper: 3,
        AC: 1,
      },
      price: {
        sleeper: 2,
        AC: 5,
      },
      delayedBy: 15,
    },
   
  ];

  res.json(trainDetails);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
