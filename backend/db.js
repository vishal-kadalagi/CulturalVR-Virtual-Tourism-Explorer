const mysql = require('mysql2/promise');

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'vrplayer'
    });
    console.log('MySQL Connected (Promise)');
    return connection;
  } catch (err) {
    console.error('DB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
