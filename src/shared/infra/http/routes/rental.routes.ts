import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalRouter = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRouter.post(
    "/",
    ensureAuthenticated,
    createRentalController.handle
);

rentalRouter.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

rentalRouter.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalRouter };