import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dayjsProvider);
    });

    it("Should be possible rent a car", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: "123",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });


    it("Should not be possible new rent a car, if exists available rent to same user", async () => {
        expect(async () =>{
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "123",
                expected_return_date: dayAdd24Hours
            });
    
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "456",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be possible new rent a car, if exists available rent to same car", async () => {
        expect(async () =>{
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "123",
                expected_return_date: dayAdd24Hours
            });
    
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "123",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be possible new rent a car, with invalid return time", async () => {
        expect(async () =>{
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "123",
                expected_return_date: dayjs().toDate()
            });
           
        }).rejects.toBeInstanceOf(AppError);
    });

});