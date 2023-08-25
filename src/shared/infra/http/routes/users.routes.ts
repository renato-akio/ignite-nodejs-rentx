import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";

const usersRouter = Router()

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRouter.post("/", createUserController.handle);
usersRouter.patch(
    "/avatar", 
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle);

usersRouter.get(
    "/profile", 
    ensureAuthenticated,
    profileUserController.handle);

export { usersRouter } 