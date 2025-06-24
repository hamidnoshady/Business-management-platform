"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const bcrypt = require("bcryptjs");
async function seed() {
    const connection = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        host: process.env.DATABASE_HOST_AUTH,
        port: parseInt(process.env.DATABASE_PORT_AUTH, 10),
        username: process.env.DATABASE_USER_AUTH,
        password: process.env.DATABASE_PASSWORD_AUTH,
        database: process.env.DATABASE_NAME_AUTH,
        entities: [user_entity_1.User],
        synchronize: true,
    });
    const userRepository = connection.getRepository(user_entity_1.User);
    const adminUser = await userRepository.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
        const newUser = new user_entity_1.User();
        newUser.username = 'admin';
        newUser.password_hash = await bcrypt.hash('admin', 10);
        await userRepository.save(newUser);
        console.log('Admin user created');
    }
    else {
        console.log('Admin user already exists');
    }
    await connection.close();
}
seed();
//# sourceMappingURL=seed.js.map