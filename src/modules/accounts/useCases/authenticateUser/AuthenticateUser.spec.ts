import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AppError } from "@shared/errors/AppError";

let autheticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        autheticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be possible authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "user test"
        }

        await createUserUseCase.execute(user);

        const result = await autheticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be possible to authenticate an nonexist user", () => {
        expect(async () => {
            await autheticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            })
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be possible authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "000123",
                email: "user@test.com",
                password: "1234",
                name: "user test"
            }

            await createUserUseCase.execute(user);

            const result = await autheticateUserUseCase.execute({
                email: user.email,
                password: "3210"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});