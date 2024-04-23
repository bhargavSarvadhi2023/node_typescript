import { END_POINTS } from '../../constant';
import BaseRoute from '../base.routes';
import { encriyptionController } from '../../controller/encryptions/encryption.controller';

class EncriptionRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.post(
            END_POINTS.ENCRIPTIONS,
            encriyptionController.encriptions,
        );
        this.router.post(END_POINTS.DECRPTIONS, encriyptionController.decrypt);
    }
}
export const encriptionRoutesRoutes = new EncriptionRoutes().router;
