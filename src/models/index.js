const { sequelize } = require('../config/connect-postgres');

const { Cart, CartItem } = require("./cart-model");
const Category = require("./category-model");
const Product = require("./product-model");
const User = require("./user-model");
const Review = require('./review-model');

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasOne(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

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