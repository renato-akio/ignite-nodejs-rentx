import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsProvider = new DayjsDateProvider();
        carsRepository = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dayjsProvider, carsRepository);
    });

    it("Should be possible rent a car", async () => {
        const car = await carsRepository.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",

        })

        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });


    it("Should not be possible new rent a car, if exists available rent to same user", async () => {
        await rentalsRepository.create({
            car_id: "1234",
            expected_return_date: dayAdd24Hours,
            user_id: "456"
        })

        await expect(
            createRentalUseCase.execute({
                user_id: "456",
                car_id: "4567",
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("User has already rent a car"));
    });

    it("Should not be possible new rent a car, if exists available rent to same car", async () => {
        await rentalsRepository.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "9876"
        })

        await expect(
            createRentalUseCase.execute({
                user_id: "6789",
                car_id: "test",
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("Should not be possible new rent a car, with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "123",
                car_id: "123",
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError("Invalid return time!"));
    });

});