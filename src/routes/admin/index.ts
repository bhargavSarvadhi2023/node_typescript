import BaseRoute from '../base.routes';
import { END_POINTS, ROLES } from '../../constant/index';
import { adminUserRoutes } from './admin.routes';

class AdminRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.use(END_POINTS.USER, adminUserRoutes);
    }
}
export const adminRoutes = new AdminRoutes().router;
