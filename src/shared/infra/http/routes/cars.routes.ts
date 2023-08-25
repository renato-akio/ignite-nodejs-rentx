import { Router } from "express"
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import uploadConfig from "@config/upload";

const carsRouter = Router()
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImagesController = new UploadCarImagesController();
 
const upload = multer(uploadConfig);

carsRouter.post(
    "/", 
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRouter.get("/available", listAvailableCarsController.handle);

carsRouter.post(
    "/specifications/:id", 
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle);

carsRouter.post(
    "/images/:id", 
    ensureAuthenticated,
    ensureAdmin,  
    upload.array("images"),
    uploadCarsImagesController.handle);

export {carsRouter}