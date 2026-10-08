CREATE DATABASE IF NOT EXISTS thuyetminh
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE thuyetminh;

-- =========================
-- BẢNG USERS
-- =========================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- BẢNG CONTENTS
-- =========================
CREATE TABLE IF NOT EXISTS contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    language VARCHAR(20) DEFAULT 'vi',
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_title_language (title, language)
);

-- =========================
-- DỮ LIỆU MẪU
-- =========================
INSERT IGNORE INTO contents
(title, description, content, language)
VALUES
(
    'Dinh Độc Lập',
    'Giới thiệu về Dinh Độc Lập',
    'Dinh Độc Lập là một công trình kiến trúc nổi tiếng tại Thành phố Hồ Chí Minh.',
    'vi'
),
(
    'Nhà thờ Đức Bà',
    'Giới thiệu về Nhà thờ Đức Bà',
    'Nhà thờ Đức Bà là một công trình kiến trúc nổi tiếng tại Thành phố Hồ Chí Minh.',
    'vi'
),
(
    'Bưu điện Thành phố',
    'Giới thiệu về Bưu điện Thành phố',
    'Bưu điện Thành phố Hồ Chí Minh là một công trình kiến trúc lâu đời.',
    'vi'
);