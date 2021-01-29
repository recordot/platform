import { ConnectionOptions } from "typeorm";

const entities = [__dirname + "/src/impl/orms/**/*.ts"];

const connectionOptions: ConnectionOptions[] = [
    // npm test 시 메모리에서 동작하도록...
    {
        name: "test",
        type: "sqljs",
        logging:true,
        synchronize: true,
        dropSchema: true,
        entities,
        migrations: [
            // seed만 함
            "src/infras/database/migration/seeds/**/*.ts"
        ],
    },
    // 로컬 환경에서 개발 ...
    {
        name: "local",
        type: "sqlite",
        database: "db.sqlite3",
        logging: true,
        synchronize: true,
        dropSchema: false,
        migrations: [
            // seed만 함
            "src/infras/database/migration/seeds/**/*.ts"
        ],
        entities
    },
    // develop
    {
        name: "develop",
        type: process.env.DB_TYPE as any,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: true,
        dropSchema: false,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities,
        migrations: [
            // seed 와 migration 모두를..
            "src/infras/database/migration/**/*.ts"
        ],
        cli: {
            migrationsDir: "src/infras/database/migration"
        }
    }, 
    // default
    {
        name: "default",
        type: process.env.DB_TYPE as any,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: true,
        dropSchema: false,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities,
        migrations: [
            // seed 와 migration 모두를..
            "src/infras/database/migration/**/*.ts"
        ],
        cli: {
            migrationsDir: "src/infras/database/migration"
        }
    }
];

export = connectionOptions