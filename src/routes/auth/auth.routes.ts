import BaseRoute from '../base.routes';
import { END_POINTS, ROLES } from '../../constant/index';
import passport from 'passport';
import { checkPermission } from '../../middleware';
import { SignupValidqtion, loginValidation } from '../../validation';
import { authController } from '../../controller/auth';

class AuthRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.post(
            END_POINTS.LOGIN,
            loginValidation,
            authController.login,
        );
        this.router.post(
            END_POINTS.SIGN_UP,
            SignupValidqtion,
            authController.sign_up,
        );
        this.router.post(
            END_POINTS.ADMIN_SIGN_UP,
            SignupValidqtion,
            authController.admin_sign_up,
        );
        this.router.post(
            END_POINTS.ADMIN_LOGIN,
            loginValidation,
            authController.admin_login,
        );
        this.router.post(END_POINTS.SEND_OTP, authController.forgot_password);
        this.router.post(END_POINTS.VERIFY_OTP, authController.verfiy_otp);
        this.router.put(
            END_POINTS.CHANGE_PASSWORD,
            authController.change_password,
        );
    }
}
export const authRoutes = new AuthRoutes().router;
