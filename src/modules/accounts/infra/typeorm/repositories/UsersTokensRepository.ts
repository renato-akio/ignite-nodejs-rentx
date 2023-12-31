import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokeDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";
import { Repository, getRepository } from "typeorm";


class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserId(user_id: string): Promise<UserTokens[]> {
        const userTokens = await this.repository.find({
            user_id
        });

        return userTokens;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOne({
            user_id,
            refresh_token
        });

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.repository.findOne({ refresh_token });
        return userToken;
    }
}

export { UsersTokensRepository }