import BaseRoute from '../base.routes';
import { END_POINTS } from '../../constant/index';
import { adminController } from '../../controller/admin';

class AdminUserRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.delete(END_POINTS.DELETE_USER, adminController.delete_user);
    }
}
export const adminUserRoutes = new AdminUserRoutes().router;
