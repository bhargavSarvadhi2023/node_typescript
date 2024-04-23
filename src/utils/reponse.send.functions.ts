import { encrypt } from '../helpers';
import { RES_STATUS, RES_TYPES } from '../constant';

const responseMappings = {
    [RES_STATUS.CREATE]: {
        statusCode: 201,
        defaultMessage: RES_TYPES.CREATE,
    },
    [RES_STATUS.GET]: {
        statusCode: 200,
        defaultMessage: RES_TYPES.FETCH,
    },
    [RES_STATUS.DELETE]: {
        statusCode: 200,
        defaultMessage: RES_TYPES.DELETE,
    },
    [RES_STATUS.UPDATE]: {
        statusCode: 200,
        defaultMessage: RES_TYPES.UPDATE,
    },
    default: { statusCode: 200, defaultMessage: 'Success' },
};

const sendResponse = (res, response) => {
    const mapping =
        responseMappings[response.responseType] || responseMappings.default;
    const { statusCode, defaultMessage } = mapping;
    const message = response.message || defaultMessage;
    const isLocalhost = res.locals.isLocalhost || false;
    if (response.responseType === RES_STATUS.GET) {
        return res.status(statusCode).json({
            success: true,
            statusCode: statusCode,
            data: isLocalhost ? response.data : encrypt(response.data), // temporary
            message: message,
            pagination: {
                total: response.total || 0,
                pageIndex:
                    Math.floor(
                        response?.paginations?.offset /
                            response?.paginations?.limit,
                    ) + 1 || null,
                pageSize: response?.paginations?.limit || null,
            },
        });
    } else {
        return res.status(statusCode).json({
            success: true,
            statusCode: statusCode,
            data: isLocalhost ? response.data : encrypt(response.data), // temporary
            message: message,
        });
    }
};

export { sendResponse };
