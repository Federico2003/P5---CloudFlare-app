-- Tabla: users
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5 registros para la tabla users
INSERT INTO users (name, email, role) VALUES 
('Federico Zaragoza', 'federico.zaragoza@example.com', 'admin'),
('Ana Garcia', 'ana.garcia@example.com', 'user'),
('Carlos Mendoza', 'carlos.mendoza@example.com', 'developer'),
('Maria Lopez', 'maria.lopez@example.com', 'designer'),
('Juan Rodriguez', 'juan.rodriguez@example.com', 'manager');

-- Tabla: products
DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5 registros para la tabla products
INSERT INTO products (name, category, price, stock) VALUES 
('Cloudflare Workers Pro', 'Cloud Services', 5.00, 100),
('D1 Database Storage', 'Storage', 15.00, 50),
('Workers AI Token Pack', 'AI Services', 20.00, 200),
('Custom Domain SSL', 'Security', 10.00, 80),
('Vectorize Index Unit', 'Vector Database', 25.00, 30);
