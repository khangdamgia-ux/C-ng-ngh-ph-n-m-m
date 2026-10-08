const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Kiểm tra server
app.get("/", (req, res) => {
    res.json({
        message: "Content Service đang chạy"
    });
});

// Kiểm tra kết nối database
app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS test");

        res.json({
            message: "Kết nối MySQL thành công",
            data: rows
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Kết nối MySQL thất bại",
            error: error.message
        });
    }
});

// Lấy danh sách nội dung
app.get("/api/contents", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT
                id,
                title,
                description,
                content,
                language,
                image_url,
                created_at
             FROM contents
             ORDER BY id`
        );

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Không thể lấy danh sách nội dung",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
    console.log(
        `Content Service chạy tại http://localhost:${PORT}`
    );
});