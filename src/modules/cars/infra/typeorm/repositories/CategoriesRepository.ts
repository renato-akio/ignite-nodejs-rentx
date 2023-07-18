import { Repository, getRepository } from "typeorm";

import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        // const category = new Category();
        // Object.assign(category, {
        //     name,
        //     description,
        //     createdAt: new Date(),
        // });
        const category = this.repository.create({
            description,
            name
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        //return this.categories;
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        // const category = this.categories.find((category) => category.name === name);
        // return category;
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository }