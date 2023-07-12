import { Category } from "../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
    create({ name, description }: ICreateCategoryDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { PostgresCategoriesRepository }