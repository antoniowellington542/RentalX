import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'antonio',
  password: '123456',
  database: 'rentx',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});

export function createConnection(
  host = 'database_ignite'
): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
