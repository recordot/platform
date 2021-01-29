import { createConnection, getConnectionOptions, getConnection, getManager, EntityManager, MigrationExecutor } from "typeorm";

function getConnectionName() {
  let name = "default";
  
  if (process.env.NODE_ENV) {
    name = process.env.NODE_ENV;
  } 
  console.log(name);
  return name;
}

export const connect = async () => {
  
  const name = getConnectionName();

  let connectionOptions;
  switch (name) {
    case "test": // memory 사용
    case "local": // 로컬 개발 환경
    case "develop": // 개발 환경 - DB 사용
      connectionOptions = await getConnectionOptions(name);
      break;
    default:
      connectionOptions = await getConnectionOptions();
      break;
  }
  
  const conn = await createConnection({ ...connectionOptions});
  
  /**
   * qa, stg, prod, beta 등은 매뉴얼리....
   */
  switch (name) {
    case "test":
    case "local":
    case "develop":
      console.log(`${name} migraion starting...` );
      await conn.runMigrations();
      break;
  }
};

export const manager = ():EntityManager => {
  const name = getConnectionName();
  return getManager(name);
}

export const close = async () => {
  const name = getConnectionName();
  await getConnection(name).close(); 
};