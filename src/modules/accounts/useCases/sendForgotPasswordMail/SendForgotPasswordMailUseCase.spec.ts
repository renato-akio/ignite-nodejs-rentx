import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/DateProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory, 
            usersTokensRepositoryInMemory, 
            dateProvider, 
            mailProvider
        );
    });

    it("Should be possible send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email:"teste@teste.com.br",
            name:"teste",
            password:"1234"
        });

        await sendForgotPasswordMailUseCase.execute("teste@teste.com.br");

        expect(sendMail).toHaveBeenCalled();

    });

    it("Should not be possible to send an email if user does not exists", async () =>{
        await expect(
            sendForgotPasswordMailUseCase.execute("usernotexists@exists.com.br")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be possible create an users tokens", async()=>{
        const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "6641682",
            email:"teste2@teste2.com.br",
            name:"teste2",
            password:"1234"
        });

        await sendForgotPasswordMailUseCase.execute("teste2@teste2.com.br");

        expect(generateTokenMail).toBeCalled();
    });
})