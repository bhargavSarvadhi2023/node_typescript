import BaseRoute from '../base.routes';
import { END_POINTS, ROLES } from '../../constant/index';
import { userController } from '../../controller/user';

class UserRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.put(END_POINTS.UPDATE_USER, userController.update_user);
    }
}
export const userRoutes = new UserRoutes().router;
