const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // replace with your MySQL password
    database: 'kriptografi'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

const runPythonScript = (action, args) => {
    return new Promise((resolve, reject) => {
        const script = path.join(__dirname, 'crypto.py');
        const pythonProcess = spawn('python', [script, action]);

        pythonProcess.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
};

// Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return alert('Username and password are required');
    }

    try {
        const encryptedPassword = await runPythonScript('encrypt', [password]);
        const user = { username, password: encryptedPassword };
        const sql = 'INSERT INTO user SET ?';
        db.query(sql, user, (err, result) => {
            if (err) {
                return res.status(500).send('Database error');
            }
            alert('User registered');
            //window.location.href = '/public/index.html'
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const sql = 'SELECT * FROM user WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(400).send('Invalid username or password');
        }

        const user = results[0];
        const { iv, ciphertext, key } = JSON.parse(user.password);

        try {
            const decryptedPassword = await runPythonScript('decrypt', [iv, ciphertext, key]);
            if (password === decryptedPassword) {
                window.location.href = '/home.html';
            } else {
                alert('Login failed : ', res.statusMessage);
            }
        } catch (error) {
            res.status(500).send('Server error');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
