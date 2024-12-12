import { UserDAO } from '../dao/classes/user.dao.js';
import { UserDTO } from '../dto/user.dto.js';

export class UserRepository {
    constructor() {
        this.dao = new UserDAO();
    }

    async getUserById(id) {
        const user = await this.dao.findById(id);
        return user ? new UserDTO(user) : null;
    }

    async getUserByEmail(email) {
        const user = await this.dao.findByEmail(email);
        return user ? new UserDTO(user) : null;
    }

    async createUser(userData) {
        const user = await this.dao.create(userData);
        return new UserDTO(user);
    }
}