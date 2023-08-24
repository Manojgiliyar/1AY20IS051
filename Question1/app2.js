const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'XOyolORPasKWOdAN';

app.use(express.json());

app.post('/train/auth', (req, res) => {
  const { companyName, clientID, ownerName, ownerEmail, rollNo, clientSecret } = req.body;

  const payload = {
    companyName,
    clientID,
    ownerName,
    ownerEmail,
    rollNo,
  };

  const expiresIn = 3600;

  const token = jwt.sign(payload, secretKey, { expiresIn });

  const response = {
    token_type: 'Bearer',
    access_token: token,
    expires_in: expiresIn,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
