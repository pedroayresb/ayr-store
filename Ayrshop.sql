-- Active: 1672694681625@@127.0.0.1@3306@Ayrshop
DROP SCHEMA IF EXISTS Ayrshop;
CREATE SCHEMA IF NOT EXISTS Ayrshop;

CREATE TABLE Ayrshop.users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  experience INTEGER NOT NULL,
  password TEXT NOT NULL
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
  FOREIGN KEY (orderId) REFERENCES Ayrshop.orders(id)
);

INSERT INTO
  Ayrshop.users (username, email, experience, password)
VALUES
  ('Pedro', 'pedroayresb@gmail.com', 10, "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"),
  ('João', 'joaoaaa@hotmail.com', 5, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
  ('Maria', 'maria@dropbox.com', 8, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
  ('José', 'jose@outlook.com', 15, '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');

INSERT INTO
  Ayrshop.orders (userId)
VALUES
  (1),
  (2),
  (3),
  (4);

INSERT INTO
  Ayrshop.products (orderId, productId, quantity)
VALUES
  (1, 'MLB123', 2),
  (1, 'MLB456', 1),
  (2, 'MLB789', 3),
  (2, 'MLB012', 1),
  (3, 'MLB345', 2),
  (3, 'MLB678', 1),
  (4, 'MLB901', 3),
  (4, 'MLB234', 1);
