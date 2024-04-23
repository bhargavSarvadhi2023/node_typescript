import { countryController } from '../../controller/country';
import { END_POINTS, ROLES } from '../../constant';
import BaseRoute from '../base.routes';

class CountryRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.get(
            END_POINTS.COUNTRY_LIST,
            countryController.get_country_list,
        );
        this.router.get(
            END_POINTS.STATE_LIST,
            countryController.get_state_list,
        );
        this.router.get(END_POINTS.CITY_LIST, countryController.get_city_list);
    }
}
export const countryRoutes = new CountryRoutes().router;
