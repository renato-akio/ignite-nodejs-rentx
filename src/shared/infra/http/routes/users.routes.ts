import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";

const usersRouter = Router()
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRouter.post("/", createUserController.handle);
usersRouter.patch(
    "/avatar", 
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle);

export { usersRouter }