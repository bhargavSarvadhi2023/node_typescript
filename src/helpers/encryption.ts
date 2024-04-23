import CryptoJS from 'crypto-js';
import pako from 'pako';
import dotenv from 'dotenv';
import { generateString } from '../utils/random.string';
import { AppError } from '../utils/index';
import { ERRORTYPES, RES_TYPES } from '../constant';

const CHIPER = process.env.CHIPER;
const ENCRYPTION_KEY = process.env.TERIFF;
const CHIPER_IV = process.env.PLAN;

export const universalBtoa = (str) => {
    return Buffer.from(str).toString('base64');
};
export const universalAtob = (str) => {
    return Buffer.from(str, 'base64').toString();
};

const bufferToBase64 = (buf: Uint8Array) => {
    const binstr = Array.prototype.map
        .call(buf, function (ch) {
            return String.fromCharCode(ch);
        })
        .join('');
    return universalBtoa(binstr);
};
const base64ToBuffer = (base64: string) => {
    const binstr = universalAtob(base64);
    const buf = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function (ch, i) {
        buf[i] = ch.charCodeAt(0);
    });
    return buf;
};
const compressData = (str) => {
    const utf_data = new TextEncoder().encode(str);
    const compressed_data = pako.gzip(utf_data);
    const compressed_datass = bufferToBase64(compressed_data);

    return generateString(16).trim() + compressed_datass;
};
const decompressData = (str) => {
    str = str.substr(16);
    const test = base64ToBuffer(str);
    const decrypted_data = pako.ungzip(test);
    const decompressed = new TextDecoder('utf-8').decode(decrypted_data);
    return decompressed;
};

function encrypt(data) {
    const phrase = JSON.stringify(data);
    const compressedData = compressData(phrase);
    if (CHIPER && ENCRYPTION_KEY && CHIPER_IV) {
        const encrypted = CryptoJS.AES.encrypt(
            compressedData,
            CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),
            {
                iv: CryptoJS.enc.Utf8.parse(CHIPER_IV),
            },
        ).toString();
        return encrypted;
    }
}

/**
 * decrypt
 * @param data encrypted string to decrypt
 * @returns decrypted data string
 * @description to decrypt encrypted string
 */
function decrypt(data) {
    try {
        if (CHIPER && ENCRYPTION_KEY && CHIPER_IV && data) {
            const decrypted = CryptoJS.AES.decrypt(
                data,
                CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),
                {
                    iv: CryptoJS.enc.Utf8.parse(CHIPER_IV),
                },
            );
            const deCpmoressed = decompressData(
                decrypted.toString(CryptoJS.enc.Utf8),
            );
            if (deCpmoressed === '') {
                return null;
            }
            return deCpmoressed;
        } else {
            throw new AppError(
                RES_TYPES.DECOMPRESS,
                ERRORTYPES.INVALID_REQUEST,
            );
        }
    } catch (error) {
        throw new AppError(RES_TYPES.ENCRIPTIONS, ERRORTYPES.INVALID_REQUEST);
    }
}
const uuidv4 = () => {
    let d = new Date().getTime(); //Timestamp
    let d2 =
        (typeof performance !== 'undefined' &&
            performance.now &&
            performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            let r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) {
                //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        },
    );
};

/**
 * dynamicEncrypt
 * @param data data to encrypt
 * @param ENCRYPTION_KEY encryption key
 * @returns encrypted string
 */
function dynamicEncrypt(data, ENCRYPTION_KEY) {
    const phrase = JSON.stringify(data);
    const compressedData = compressData(phrase);
    if (CHIPER && ENCRYPTION_KEY && CHIPER_IV && data) {
        const encrypted = CryptoJS.AES.encrypt(
            compressedData,
            CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),
            {
                iv: CryptoJS.enc.Utf8.parse(CHIPER_IV),
            },
        ).toString();

        return encrypted;
    }
}

/**
 * dynamicDecrypt
 * @param data encrypted string
 * @param ENCRYPTION_KEY encryption key
 * @returns decrypted data
 */
function dynamicDecrypt(data, ENCRYPTION_KEY) {
    try {
        if (CHIPER && ENCRYPTION_KEY && CHIPER_IV) {
            const decrypted = CryptoJS.AES.decrypt(
                data,
                CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),
                {
                    iv: CryptoJS.enc.Utf8.parse(CHIPER_IV),
                },
            );
            const deCpmoressed = decompressData(
                decrypted.toString(CryptoJS.enc.Utf8),
            );
            if (deCpmoressed === '') {
                return null;
            }
            return deCpmoressed;
        } else {
            throw new AppError(
                RES_TYPES.DECOMPRESS,
                ERRORTYPES.INVALID_REQUEST,
            );
        }
    } catch (error) {
        throw new AppError(RES_TYPES.ENCRIPTIONS, ERRORTYPES.INVALID_REQUEST);
    }
}

const getHash = (data) => {
    const hash = CryptoJS.SHA256(data);
    return hash.toString(CryptoJS.enc.Base64);
};

export {
    compressData,
    decompressData,
    encrypt,
    decrypt,
    uuidv4,
    base64ToBuffer,
    dynamicEncrypt,
    dynamicDecrypt,
    getHash,
};
