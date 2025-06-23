import { createConnection } from 'typeorm';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST_AUTH,
    port: parseInt(process.env.DATABASE_PORT_AUTH, 10),
    username: process.env.DATABASE_USER_AUTH,
    password: process.env.DATABASE_PASSWORD_AUTH,
    database: process.env.DATABASE_NAME_AUTH,
    entities: [User],
    synchronize: true,
  });

  const userRepository = connection.getRepository(User);

  const adminUser = await userRepository.findOne({ where: { username: 'admin' } });

  if (!adminUser) {
    const newUser = new User();
    newUser.username = 'admin';
    newUser.password_hash = await bcrypt.hash('admin', 10);
    await userRepository.save(newUser);
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  await connection.close();
}

seed();
