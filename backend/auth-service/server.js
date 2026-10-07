const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Kiểm tra server
app.get("/", (req, res) => {
    res.json({
        message: "Auth Service đang chạy"
    });
});

// Kiểm tra kết nối MySQL
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
// Đăng ký tài khoản
app.post("/api/auth/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra dữ liệu
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin"
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const [users] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (users.length > 0) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            });
        }

        // Mã hóa mật khẩu
        const passwordHash = await bcrypt.hash(password, 10);

        // Lưu tài khoản vào database
        await pool.query(
            `INSERT INTO users
            (username, email, password_hash)
            VALUES (?, ?, ?)`,
            [username, email, passwordHash]
        );

        res.status(201).json({
            message: "Đăng ký thành công"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        });
    }
});
// Đăng nhập
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra dữ liệu
        if (!email || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập email và mật khẩu"
            });
        }

        // Tìm tài khoản
        const [users] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        const user = users[0];

        // Kiểm tra mật khẩu
        const dungMatKhau = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!dungMatKhau) {
            return res.status(401).json({
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        // Tạo JWT
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Trả kết quả
        res.json({
            message: "Đăng nhập thành công",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        });
    }
});
// API cần đăng nhập mới được truy cập
app.get("/api/auth/me", verifyToken, (req, res) => {
    res.json({
        message: "JWT hợp lệ",
        user: req.user
    });
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Auth Service chạy tại http://localhost:${PORT}`);
});