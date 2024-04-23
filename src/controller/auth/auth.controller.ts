import { db } from '../../model';
import dotenv from 'dotenv';
dotenv.config();
import {
    ERRORTYPES,
    MODEL,
    NotificationTypes,
    RES_STATUS,
    RES_TYPES,
    ROLES,
} from '../../constant';
import { AppError, SendNotificationEmail, sendResponse } from '../../utils';
import { TokenController } from '../../config/passport.jwt';

class AuthController {
    async login(req, res, next) {
        try {
            const {
                body: {
                    data: { email, password },
                },
            } = req;
            const result = await db[MODEL.USER].findOne({ where: { email } });
            if (result && result.authenticate(password)) {
                const payload = {
                    id: result.id,
                    Email: result.email,
                    phone: result.phone,
                };
                const token = await TokenController.createToken(payload, next);
                return sendResponse(res, {
                    success: true,
                    data: {
                        token: token,
                        id: result.id,
                        role: result.role,
                        email: result.email,
                    },
                    message: res.__('common').login,
                });
            } else {
                return next(
                    new AppError(RES_TYPES.AUTH_FAIL, ERRORTYPES.UNAUTHORIZED),
                );
            }
        } catch (error) {
            return next(error);
        }
    }

    async sign_up(req, res, next) {
        try {
            const {
                body: {
                    data: { phone, email },
                },
            } = req;
            const exist_user = await db[MODEL.USER].findOne({
                where: { email },
            });
            if (exist_user) {
                return next(
                    new AppError(RES_TYPES.USER_EXISTS, ERRORTYPES.CONFLICT),
                );
            }
            req.body.data.role = ROLES.USER;
            const create_user = await db[MODEL.USER].create(req.body.data);
            return sendResponse(res, {
                responseType: RES_STATUS.CREATE,
                message: res.__('user').create,
            });
        } catch (error) {
            return next(error);
        }
    }

    async admin_sign_up(req, res, next) {
        try {
            const {
                body: {
                    data: { email },
                },
            } = req;
            const exist_user = await db[MODEL.USER].findOne({
                where: { email },
            });
            if (exist_user) {
                return next(
                    new AppError(RES_TYPES.USER_EXISTS, ERRORTYPES.CONFLICT),
                );
            }
            req.body.data.role = ROLES.SUPER_ADMIN;
            const create_user = await db[MODEL.USER].create(req.body.data);
            return sendResponse(res, {
                responseType: RES_STATUS.CREATE,
                message: res.__('user').create,
            });
        } catch (error) {
            return next(error);
        }
    }

    async admin_login(req, res, next) {
        try {
            const {
                body: {
                    data: { email, password },
                },
            } = req;
            const result = await db[MODEL.USER].findOne({
                where: { email, role: ROLES.SUPER_ADMIN },
            });
            if (result && result.authenticate(password)) {
                const payload = {
                    id: result.id,
                    email: result.email,
                    phone: result.phone,
                };
                const token = await TokenController.createToken(payload, next);
                return sendResponse(res, {
                    success: true,
                    data: {
                        token: token,
                        id: result.id,
                        role: result.role,
                        email: result.email,
                    },
                    message: res.__('common').login,
                });
            } else {
                return next(
                    new AppError(RES_TYPES.AUTH_FAIL, ERRORTYPES.UNAUTHORIZED),
                );
            }
        } catch (error) {
            return next(error);
        }
    }

    async forgot_password(req, res, next) {
        try {
            const {
                params: { email },
            } = req;
            const result = await db[MODEL.USER].findOne({ where: { email } });
            if (!result) {
                return next(
                    new AppError(RES_TYPES.AUTH_FAIL, ERRORTYPES.UNAUTHORIZED),
                );
            }
            const generateOTP = () => {
                const otp = Math.floor(100000 + Math.random() * 900000);
                return otp.toString();
            };
            const otp = generateOTP();
            const [existingotp, created] = await db[MODEL.OTP].findOrCreate({
                where: { email: email },
                defaults: {
                    email: email,
                    otp: otp,
                },
            });
            if (!created) {
                const update_otp = await db[MODEL.OTP].update(
                    { otp: otp, is_verified: false },
                    { where: { email: email } },
                );
            }
            const sendmail = new SendNotificationEmail(
                NotificationTypes.FORGOT_PSW,
                email,
                {
                    otp,
                },
            );
            return sendResponse(res, {
                responseType: RES_STATUS.GET,
                message: res.__('common').otp_send,
            });
        } catch (error) {
            return next(error);
        }
    }

    async verfiy_otp(req, res, next) {
        try {
            const {
                body: {
                    data: { email, otp },
                },
            } = req;

            const verify_otp = await db[MODEL.OTP].findOne({
                email,
                otp,
                is_verified: false,
            });
            if (!verify_otp) {
                return next(
                    new AppError(RES_TYPES.WRONG_OTP, ERRORTYPES.UNAUTHORIZED),
                );
            }
            const token = await TokenController.createToken(
                { email: email, otp },
                next,
            );
            return sendResponse(res, {
                responseType: RES_STATUS.GET,
                data: token,
                message: res.__('common').otp_verified,
            });
        } catch (error) {
            return next(error);
        }
    }

    async change_password(req, res, next) {
        try {
            const {
                body: {
                    data: { token, password },
                },
            } = req;
            const decodedtoken = await TokenController.decodeToken(token);
            const check_user = await db[MODEL.OTP].findOne({
                emai: decodedtoken['email'],
                otp: decodedtoken['otp'],
                is_verified: true,
            });
            if (!check_user) {
                return next(
                    new AppError(RES_TYPES.WRONG_OTP, ERRORTYPES.UNAUTHORIZED),
                );
            }
            const update_password = await db[MODEL.USER].update(
                { password },
                { where: { email: decodedtoken['email'] } },
            );
            return sendResponse(res, {
                responseType: RES_STATUS.GET,
                message: res.__('common').update_password,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const authController = new AuthController();
