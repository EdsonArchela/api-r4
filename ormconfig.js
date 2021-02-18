require('dotenv/config')

const extension = process.env.NODE_ENV === 'development' ? '.ts' : '.js';
const folder = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports=
  {
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "R4-api",
    entities: [`./${folder}/modules/**/infra/typeorm/entities/*${extension}`],
    migrations: [`./${folder}/shared/infra/typeorm/migrations/*${extension}`],
    cli: {
      "migrationsDir": `./${folder}/shared/infra/typeorm/migrations`
    }
  }

