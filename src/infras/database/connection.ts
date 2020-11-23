import { createConnection, getConnectionOptions, getConnection, getManager, EntityManager } from "typeorm";

function getName() {
  let name = "default";
  
  if (process.env.NODE_ENV) {
    name = process.env.NODE_ENV;
  } 
  
  return name;
}

export const connect = async () => {
  
  const name = getName();
  console.log(`orm connection is ${name}`);
  const connectionOptions = await getConnectionOptions(name);
  // await createConnection({ ...connectionOptions, name: "default" });
  await createConnection({ ...connectionOptions});
};

export const manager = ():EntityManager => {
  const name = getName();

  return getManager(name);
}

export const close = async () => {
  const name = getName();
  await getConnection(name).close(); 
};