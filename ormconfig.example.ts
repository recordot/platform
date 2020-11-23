import { ConnectionOptions } from "typeorm";

const entities = [__dirname + "/src/impl/orms/**/*.ts"];

const connectionOptions: ConnectionOptions[] = [
    // npm test 시 메모리에서 동작하도록...
    {
        name: "test",
        type: "sqljs",
        logging:true,
        synchronize: true,
        dropSchema: true, // Isolate each test case
        entities,
        migrations: ["src/infras/database/seed/dev/**/*.ts"],
    },
    // 로컬 환경에서 개발 ...
    {
        name: "local",
        type: "sqlite",
        database: "db.sqlite3",
        logging: true,
        synchronize: true,
        dropSchema: true, // 데이터 초기화
        entities,
        migrations: ["src/infras/database/seed/dev/**/*.ts"],
    },
    {
        name: "stage",
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
            "src/infras/database/migration/**/*.ts",
            "src/infras/database/seed/stg/**/*.ts"
        ],
        cli: {
            migrationsDir: "src/infras/database/migration"
        }
    },
    {
        name: "production",
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
            "src/infras/database/migration/**/*.ts",
            "src/infras/database/seed/prod/**/*.ts"
        ],
        cli: {
            migrationsDir: "src/infras/database/migration"
        }
    }
];

export = connectionOptions