const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'bamazondb'
});

let products = [];
let total = 0;
let quantity = 0;

let purchase = () => {
    connection.query('SELECT * FROM products', (error, result) => {
        if (error) throw error;
        result.map((product, index) => products[index] = `${product.product_name} ($${product.price})`);
        inquirer.prompt({
            type: 'list',
            message: 'Please choose the product you want to order?',
            name: 'productSelector',
            choices: products,
            filter: val => val.split(" (")[0]
        }).then(res => {
            let currentProduct = result.find(product => product.product_name === res.productSelector);
            if (currentProduct.stock_quantity === 0) {
                console.log(`We are sorry, ${currentProduct.product_name} is out of stock!`);
                connection.end();
                return;
            }
            inquirer.prompt({
                type: 'input',
                message: 'Please enter the quantity',
                name: 'quantityInput',
                validate: val => {
                    if (val <= currentProduct.stock_quantity && val) {
                        total = (val * currentProduct.price).toFixed(2);
                        quantity = val;
                        return true;
                    } else {
                        console.log(`\nWe're sorry, we only have ${currentProduct.stock_quantity} of this item.`);
                        return false;
                    };
                }
            }).then(() => {
                console.log(`\n\nThank you for your order!\nPlease check your order summary below:\n\n============================================\n-> ${quantity} x ${currentProduct.product_name} @ $${currentProduct.price}\n--------------------------------------------\nTotal: $${total}\n============================================\n`);
                connection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: currentProduct.stock_quantity - quantity }, { product_name: currentProduct.product_name }], (error, result) => {
                    if (error) throw error;
                    console.log(`\nThe card on the account has been charged for ${total}`);
                });
                connection.end();
            });
        });
    });
}

module.exports = purchase;