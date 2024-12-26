import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    DB_USERNAME: string;
    JWT_SECRET: string;
    POSTGRES_URL: string;
    USE_SSL: boolean;
    SEED_EXECUTED: boolean;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    POSTGRES_URL: joi.string().required(),
    USE_SSL: joi.boolean().required(),
    SEED_EXECUTED: joi.boolean().required(),
    FIREBASE_PROJECT_ID: joi.string().optional(),
    FIREBASE_PRIVATE_KEY: joi.string().optional(),
    FIREBASE_CLIENT_EMAIL: joi.string().optional(),
})
.unknown( true );

const { error, value } = envsSchema.validate( process.env );

if ( error ) throw new Error(`Config validation error: ${ error.message }`);

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    dbHost: envVars.DB_HOST,
    dbName: envVars.DB_NAME,
    dbPassword: envVars.DB_PASSWORD,
    dbPort: envVars.DB_PORT,
    dbUsername: envVars.DB_USERNAME,
    jwtSecret: envVars.JWT_SECRET,
    postgresUrl: envVars.POSTGRES_URL,
    useSsl: envVars.USE_SSL,
    seedExecuted: envVars.SEED_EXECUTED,
    firebaseProjectId: envVars.FIREBASE_PROJECT_ID,
    firebasePrivateKey: envVars.FIREBASE_PRIVATE_KEY,
    firebaseClientEmail: envVars.FIREBASE_CLIENT_EMAIL,
}
