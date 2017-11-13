const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'bamazondb'
});

let products = [];
let quantity = 0;

let manage = () => {
    console.log('Manager');
    inquirer.prompt({
        type: 'list',
        name: 'task',
        message: 'What are you trying to do?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }).then(tasks => {
        switch (tasks.task) {
            case 'View Products for Sale':
                connection.query('SELECT * FROM products', (error, result) => {
                    if (error) throw error;
                    result.map((product, index) => console.log(`Product: ${product.product_name}\n\tDepartment: ${product.department_name}\n\tInventory: ${product.stock_quantity}\n\tPrice: $${product.price}\n`));
                    connection.end();
                });
                break;
            case 'View Low Inventory':
                connection.query('SELECT * FROM products', (error, result) => {
                    if (error) throw error;
                    result.map((product, index) => product.stock_quantity < 5 && console.log(`Product: ${product.product_name}\n\tInventory: ${product.stock_quantity}\n\tPrice: $${product.price}\n`));
                    connection.end();
                });
                break;
            case 'Add to Inventory':
                connection.query('SELECT * FROM products', (error, result) => {
                    result.map((product, index) => products[index] = product.product_name);
                    inquirer.prompt({
                        type: 'list',
                        message: 'Please choose the product you want to add inventory to?',
                        name: 'productSelector',
                        choices: products,
                    }).then(res => {
                        let currentProduct = result.find(product => product.product_name === res.productSelector);
                        inquirer.prompt({
                            type: 'input',
                            message: 'Please enter the quantity you want to add:',
                            name: 'quantityInput',
                            validate: val => {
                                if (val !== 0 && val) {
                                    quantity = val;
                                    return true;
                                } else {
                                    console.log(`\nPlease enter a valid quantity!`);
                                    return false;
                                };
                            }
                        }).then(() => {
                            connection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: parseInt(currentProduct.stock_quantity) + parseInt(quantity) }, { product_name: currentProduct.product_name }], (error, result) => {
                                if (error) throw error;
                                console.log(`\nThe inventory of ${currentProduct.product_name} has been updated to ${parseInt(currentProduct.stock_quantity) + parseInt(quantity)}`);
                            });
                            connection.end();
                        });
                    });
                });
                break;
            case 'Add New Product':
                inquirer.prompt([{
                        type: 'input',
                        name: 'productName',
                        message: 'Please enter the name of the product:'
                    },
                    {
                        type: 'input',
                        name: 'productQuantity',
                        message: 'Please enter the quantity of the product:',
                        validate: val => {
                            quantity = parseInt(val);
                            if (Number.isInteger(quantity)) {
                                return true;
                            } else {
                                console.log('Please enter an integer number for quantity!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'productPrice',
                        message: 'Please enter the price of the product:',
                        validate: val => {
                            if (isNaN(val)) {
                                console.log('Please enter an integer number for quantity!');
                                return false;
                            } else {
                                return true;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'productDepartment',
                        message: 'Please choose the department of the product:',
                        choices: ['Video Games', 'Electronics']
                    }
                ]).then(product => {
                    connection.query('INSERT INTO products SET ?', {
                        product_name: product.productName,
                        department_name: product.productDepartment,
                        price: parseFloat(product.productPrice).toFixed(2),
                        stock_quantity: product.productQuantity
                    });
                    connection.end();
                })
                break;
        }
    })
}

module.exports = manage;