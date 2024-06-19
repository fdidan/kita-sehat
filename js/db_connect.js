// Requiring modules
const express = require('express');
const app = express();

// Get request
app.get('/', function (req, res) {

    // Config your database credential
    const config = {
        user: 'root',
        password: '',
        server: 'localhost',
        database: 'kriptografi'
    };

    // Connect to your database
    app.post("/user", async (req, res) => {
        try {
          const { username, email, password } = req.body;
          const [{ insertId }] = await connection.promise().query(
            `INSERT INTO users (username, email, password) 
                VALUES (?, ?,?)`,
            [username, email, password]
          );
          res.status(202).json({
            message: "User Created",
          });
        } catch (err) {
          res.status(500).json({
            message: err,
          });
        }
      });
});

let server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});
