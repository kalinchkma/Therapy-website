const http = require('http');

const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config({ path: '.env.local' });

const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	multipleStatements: true,
	connectTimeout: 15000,
	connectionLimit: 20,
};


// Create an instance of the http server to handle HTTP requests
let app = http.createServer( async (req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send back a response and end the connection
    //res.end('Hello World!\n'); // comment this line   
    try {
        const connection = mysql.createPool(config);

        const [rows, fileds] = await connection.query('SELECT * FROM users');
        console.log(rows)
        res.end("Database ok");

    } catch(error) {
        console.log(error)
        res.end("Database is not ok");
    }

});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log("server is running");

