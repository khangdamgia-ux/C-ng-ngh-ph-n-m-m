const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    try {
        // Lấy token từ Header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập"
            });
        }

        // Kiểm tra có phải dạng Bearer Token không
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Token không đúng định dạng"
            });
        }

        const token = parts[1];

        // Kiểm tra JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Lưu thông tin người dùng vào request
        req.user = decoded;

        // Cho phép đi tiếp
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token không hợp lệ hoặc đã hết hạn"
        });
    }
}

module.exports = verifyToken;