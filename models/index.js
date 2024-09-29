const { sequelize } = require('../db/connect-postgres');

const { Cart, CartItem } = require("./cart-model");
const Category = require("./category-model");
const Product = require("./product-model");
const User = require("./user-model");

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Sync models with the database
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("All tables created or already exist");
    } catch (err) {
        console.error(`Error syncing models: ${err}`);
    }
};

// Export models and sync function
module.exports = {
    User,
    Cart,
    Product,
    Category,
    syncDatabase,
};