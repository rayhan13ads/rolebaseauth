import "reflect-metadata";
import { AdminController } from "../controllers/adminController";
import { Container } from "inversify";
import { AuthController } from "../controllers/authController";

const DIContainer:Container = new Container();

const admin:AdminController = DIContainer.resolve<AdminController>(AdminController);
const authController:AuthController = DIContainer.resolve<AuthController>(AuthController);

export{
    admin,
    authController
}