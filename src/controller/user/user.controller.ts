import { db } from '../../model';
import dotenv from 'dotenv';
dotenv.config();
import {
    ERRORTYPES,
    MODEL,
    RES_STATUS,
    RES_TYPES,
    ROLES,
} from '../../constant';
import { AppError, sendResponse } from '../../utils';

class UserController {
    async update_user(req, res, next) {
        try {
            const {
                body: {
                    data: { email },
                },
                params: { id },
            } = req;
            const exist_user = await db[MODEL.USER].findOne({
                where: { email },
            });
            if (exist_user && exist_user.id !== id) {
                return next(
                    new AppError(RES_TYPES.USER_EXISTS, ERRORTYPES.CONFLICT),
                );
            }
            const update_user = await db[MODEL.USER].update(req.body.data, {
                where: { id },
            });
            return sendResponse(res, {
                responseType: RES_STATUS.UPDATE,
                message: res.__('user').update_user,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const userController = new UserController();
