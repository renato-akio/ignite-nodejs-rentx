import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationRepository: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationRepository = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepository, 
            specificationRepository
            );
    });

    it("Should not be possible to add a new specification to an non-exists car", async () => {
        expect(async ()=>{
            const car_id = "1234";
            const specifications_id = ["54321"];
    
            await createCarSpecificationUseCase.execute({car_id, specifications_id})
        }).rejects.toBeInstanceOf(AppError);

    });    

    it("Should be possible to add a new specification to the car", async () => {
        const car = await carsRepository.create({
            name:"Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id:"category"
        });

        const specification = await specificationRepository.create({
            description: "test",
            name: "test"
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id, 
            specifications_id
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});