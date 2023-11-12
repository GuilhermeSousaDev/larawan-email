import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "postgres",
  database: "postgres",
  password: "postgres",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});
