import { ConnectionOptions } from "typeorm";

const TYPEORM_HOME = "src/lib/typeorm";

const ormconfig: ConnectionOptions = {
  name: "default",
  type: "mariadb",
  host: "mariadb",
  port: 3306,
  username: "admin",
  password: "admin",
  database: "airlog",
  entities: [ `${ TYPEORM_HOME }/entity/**/*.{ts,js}` ],
  migrations: [ `${ TYPEORM_HOME }/migration/**/*.{ts,js}` ],
  subscribers: [ `${ TYPEORM_HOME }/subscriber/**/*.{ts,js}` ],
  cli: {
    entitiesDir: `${ TYPEORM_HOME }/entity`,
    migrationsDir: `${ TYPEORM_HOME }/migration`,
    subscribersDir: `${ TYPEORM_HOME }/subscriber`,
  },
  migrationsTableName: "migrations",
  synchronize: true, // 스키마 동기화
  // dropSchema: true, // 커넥션 끊길 때, 데이터 전부 삭제

  logging: false,
  // logger: "advanced-console",
  // logging: [ "error", "warn", "schema", "query" ], // process.env.TYPEORM_ENV == "development"
};

export default ormconfig;