DROP DATABASE IF EXISTS bamazondb;
CREATE DATABASE bamazondb;
USE bamazondb;
CREATE table products (
item_id INTEGER(10) AUTO_INCREMENT,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price  DECIMAL(8, 2) NOT NULL,
stock_quantity INTEGER(5),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Call of Duty WWII", "Video Games", 69.99, 100),
("Horizon Zero Dawn", "Video Games", 20.99, 10),
("Battlefield 1", "Video Games", 29.99, 110),
("Fifa 18", "Video Games", 49.99, 50),
("Overwatch", "Video Games", 50.99, 60),
("Playstation 4 Pro", "Electronics", 449.99, 250),
("Playstation VR", "Electronics", 399.99, 150),
("Observer", "Video Games", 29.99, 20),
("Sony XBR Z9D 75 Inch", "Electronics", 5999.99, 10),
("Wolfenstein II: The New Colossus", "Video Games", 49.99, 300);

SELECT * FROM products;