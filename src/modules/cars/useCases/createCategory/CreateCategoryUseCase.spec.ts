// describe("primeiro teste", () => {
//     it("Espero que  2 + 2 seja igual a 4", () =>{
//         const soma = 2 + 2;
//         const resultado = 4;
//         expect(soma).toBe(resultado);
//     });

//     it("espero que 2 + 2 não seja igual a 5", () =>{
//         const soma = 2 + 2;
//         const resultado = 5;

//         expect(soma).not.toBe(resultado);
//     });
// });
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Categoryy", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("should be possible to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test"
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be possible to create a new category with a exists name", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test"
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        await expect(
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        ).rejects.toEqual(new AppError("Category already exists"));
    });
});
