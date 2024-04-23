import { ERRORTYPES, MODEL, RES_STATUS, RES_TYPES } from '../../constant';
import { AppError, sendResponse } from '../../utils';
import { db } from '../../model';

class CountryController {
    async get_country_list(req, res, next) {
        try {
            const country_list = await db[MODEL.COUNTRY].findAll({
                where: { is_active: 1 },
            });
            return sendResponse(res, {
                responseType: RES_STATUS.GET,
                data: country_list,
                message: res.__('country').get_country_list,
            });
        } catch (error) {
            return next(error);
        }
    }
    async get_state_list(req, res, next) {
        try {
            const {
                params: { country_id },
            } = req;
            const state_list = await db[MODEL.STATE].findAll({
                where: { country_id: country_id },
            });
            return sendResponse(res, {
                responseType: RES_STATUS.GET,
                data: state_list,
                message: res.__('country').get_state_list,
            });
        } catch (error) {
            return next(error);
        }
    }

    async get_city_list(req, res, next) {
        try {
            const {
                params: { state_id },
            } = req;
            const city_list = await db[MODEL.CITY].findAll({
                where: { state_id },
            });
            return sendResponse(res, {
                responseType: RES_STATUS.GET,
                data: city_list,
                message: res.__('country').get_cities_list,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const countryController = new CountryController();
