-- Active: 1672694681625@@127.0.0.1@3306
DROP SCHEMA IF EXISTS Ayrshop;
CREATE SCHEMA IF NOT EXISTS Ayrshop;

CREATE TABLE Ayrshop.cart (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL
);

CREATE TABLE Ayrshop.users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  experience INTEGER NOT NULL,
  cartId INTEGER NOT NULL,
  password TEXT NOT NULL,
  FOREIGN KEY (cartId) REFERENCES Ayrshop.cart(id)
);

CREATE TABLE Ayrshop.orders (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  userId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES Ayrshop.users(id)
);

CREATE TABLE Ayrshop.products (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  orderId INTEGER NOT NULL,
  productId TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price FLOAT(2) NOT NULL,
  FOREIGN KEY (orderId) REFERENCES Ayrshop.orders(id)
);

CREATE TABLE Ayrshop.cart_products (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  cartId INTEGER NOT NULL,
  productId TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price FLOAT(2) NOT NULL,
  FOREIGN KEY (cartId) REFERENCES Ayrshop.cart(id)
);

INSERT INTO
  Ayrshop.cart (id)
VALUES
  (1),
  (2),
  (3),
  (4);

INSERT INTO
  Ayrshop.users (username, email, experience, cartId, password)
VALUES
  ('user1', 'user1@email.com', 10, 1, 'pedro123'),
  ('user2', 'user2@email.com', 8, 2, 'pedro123'),
  ('user3', 'user3@email.com', 5, 3, 'pedro123'),
  ('user4', 'user4@email.com', 9, 4, 'pedro123');