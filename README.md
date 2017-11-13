# BAmazon

This is an E-Commerce application simulator in a commandline environment, where user can identify them selves as either customer or manager.

### Database Schema

The inventory is being stored in a MySQL Database called `bamazon_db`, within a table called `products`. Each product has the following attributes in columns:

1. item_id (unique id for each product)

1. product_name (Name of product)

1. department_name

1. price (cost to customer)

1. stock_quantity (how much of the product is available in stores)

### User flow

This is a node.js application and uses the following npm packages:

* [inquirer](https://www.npmjs.com/package/inquirer)

* [mysql](https://www.npmjs.com/package/mysql)


In order to install the required dependencies, please run `npm install`

After installing the dependencies you need to start MySQL Server using `mysql.server start` in the terminal and import the schema from `bamazondb.sql` from `schemas` directory to create the required database and table with mock data.

Then the application can be started using: `npm start` or `node .` within the root folder.

- If you enter as a customer, the app will take in your order and updates stock from the store's inventory. 

	* You need to select a product from the list that shows all of the product in the table and their prices

	* If the product is out of stuck the application will show you an error

	* If it is available you enter the quantity for the order:

		* If the quantity entered is available you will see your order summary

		* if the quantity entered is more than stock quantity, you will see an error that shows how many of the item is available and takes you back to the question.


- If you enter as a manager, you can do any of the following:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
	* Add New Product

* If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, department and quantities.

* If a manager selects `View Low Inventory`, the app lists all items with an inventory count lower than five.

* If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

* If a manager selects `Add New Product`, the app allows the manager to add a completely new product to the store.


### Demo

please see the `BAmazon.mp4` for a video demo of how the application works.