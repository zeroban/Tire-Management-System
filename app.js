require('dotenv').config();
require('express-async-errors');

// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')




const express = require('express');
const app = express();


// connectDB
const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')

app.use(express.static("public"));



// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/tires')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust proxy', 1);
// invoking imported packages
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
})
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tires', authenticateUser, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
