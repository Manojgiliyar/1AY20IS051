const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let isRegistered = false;

app.post('/train/register', (req, res) => {
  if (isRegistered) {
    res.status(200).json({
      message: "You can register only once ",
    });
  } else {
    const credentials = {
      companyName: req.body.companyName,
      clientID: 'b46118f0-fbde-4b16-a4b1-6ae6ad718b27',
      clientSecret: 'XOyol0RPasKWODAN',
    };

    isRegistered = true;

    res.status(200).json(credentials);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
