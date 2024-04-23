import { decrypt } from '../helpers/index';

/**
 * decryptData
 * @description if data come's in req.body then decrypt it and attach with req.body
 */
const decryptData = async (req, res, next) => {
    try {
        if (req.body.data) {
            const decryptedData = JSON.parse(decrypt(req.body.data));
            req.body.data = decryptedData;
        }
        next();
    } catch (error) {
        next(error);
    }
};

export { decryptData };
