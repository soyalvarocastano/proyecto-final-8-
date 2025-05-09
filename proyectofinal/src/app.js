// app.js
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { addLogger, logger } from './utils/logger.js';
import __dirname from './utils/index.js';

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    dbName: 'adoptme'
})
    .then(() => logger.info('✅ Conectado a MongoDB'))
    .catch(err => {
        logger.error('❌ Error conectando a MongoDB:', err.message);
        process.exit(1);
    });

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Adopme API',
            description: 'Documentación con Swagger'
        }
    },
    apis: [`${__dirname}/../docs/**/*.yaml`]
};

const specs = swaggerJsDoc(swaggerOptions);

app.use(addLogger);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
}));

app.use('/api/documentacion', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

export default app;
