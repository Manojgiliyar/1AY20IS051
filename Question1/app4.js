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

app.get('/20.244.56.144:80/train/trains/2344', authenticateToken, (req, res) => {
  const requestedTrainNumber = req.params.trainNumber;

  const trainDetails = fetchTrainDetailsFromDataSource(requestedTrainNumber);

  if (!trainDetails) {
    return res.status(404).json({ message: 'Train details not found' });
  }

  res.json(trainDetails);
});

function fetchTrainDetailsFromDataSource(trainNumber) {
  if (trainNumber === '2343') {
    return {
      trainName: 'Delhi Door Hai Exp',
      trainNumber: '2343',
      departureTime: {
        Hours: 9,
        Minutes: 45,
        Seconds: 0,
      },
      seatsAvailable: {
        sleeper: 32,
        AC: 1,
      },
      price: {
        sleeper: 1,
        AC: 723,
      },
      delayedBy: 3,
    };
  } else {
    return null;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
