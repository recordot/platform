import { ConnectionOptions } from "typeorm";

const entities = [__dirname + "/src/impl/orms/**/*.ts"];

const connectionOptions: ConnectionOptions[] = [
    {
        name: "test",
        type: 'sqljs',
        entities,
        logging: false,
        dropSchema: true, // Isolate each test case
        synchronize: true
    },
    {
        name: "develop",
        type: "sqlite",
        database: "db.sqlite3",
        synchronize: true,
        dropSchema: false, // Isolate each test case
        entities
    },
    {
        name: "default",
        type: "mariadb",
        database: 'platform',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1',
        synchronize: true,
        dropSchema: true,
        logging: false,
        entities,
        migrations: ["src/infras/database/migration/develop/*.ts"],
        cli: {
            migrationsDir: "src/infras/database/migration/develop"
        }
    }
];

export = connectionOptions