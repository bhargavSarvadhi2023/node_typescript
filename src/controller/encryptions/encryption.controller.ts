import { decrypt, encrypt } from '../../helpers/encryption';

class EncrptionController {
    async encriptions(req, res, next) {
        try {
            const encriptions = req.body.data;
            const data = encrypt(encriptions);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: data,
            });
        } catch (error) {
            return next(error);
        }
    }

    async decrypt(req, res, next) {
        try {
            const dcrpt = req.body.data;
            const data = JSON.parse(decrypt(dcrpt));
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: data,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const encriyptionController = new EncrptionController();
