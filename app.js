require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express');
const app = express();

const { connectPostgres } = require('./db/connect-postgres');
const { syncDatabase } = require('./models/index')

const authenticateUser = require('./middleware/authentication');
const adminAuth = require('./middleware/admin-authorization');

// routers
const userRouter = require('./routes/user-route');
const adminRouter = require('./routes/admin-route');
const productRouter = require('./routes/product-route');
const categoryRouter = require('./routes/category-route');
const cartRouter = require('./routes/cart-route');
const reviewRouter = require('./routes/review-route');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
    res.send('<h1>E-Commerce API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use('/api/v1/admin', authenticateUser, adminAuth, adminRouter);
app.use('/api/v1/cart/', authenticateUser, cartRouter);
app.use('/api/v1/review/', authenticateUser, reviewRouter);
// authentication middlewares inside route 
app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', categoryRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectPostgres();
        await syncDatabase();

        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
