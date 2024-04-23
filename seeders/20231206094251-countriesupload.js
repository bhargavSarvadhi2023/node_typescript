/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable indent */
'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         const csv = require('csv-parser');
//         const fs = require('fs');
//         const path = require('path');
//         const csvFilePath = path.join(
//             __dirname,
//             '../',
//             './src/uploads/countries.csv',
//         );
//         const data = [];
//         await new Promise((resolve, reject) => {
//             fs.createReadStream(csvFilePath)
//                 .pipe(csv())
//                 .on('data', (raw) => {
//                     const { id, countryName, iso2 } = raw;
//                     data.push({
//                         id,
//                         countryName,
//                         iso2,
//                         createdAt: new Date(),
//                         updatedAt: new Date(),
//                     });
//                 })
//                 .on('end', () => {
//                     resolve();
//                 })
//                 .on('error', (error) => {
//                     reject(error);
//                 });
//         });
//         return queryInterface.bulkInsert('country', data, {});
//     },

//     async down(queryInterface, Sequelize) {},
// };

const fs = require('fs');
const path = require('path');

const countries = [
    'United States',
    'Canada',
    'Israel',
    'United Kingdom',
    'Argentina',
    'Australia',
    'Austria',
    'Belgium',
    'Brazil',
    'Chile',
    'Colombia',
    'Costa Rica',
    'Cuba',
    'Czech Republic',
    'Denmark',
    'Ecuador',
    'France',
    'Germany',
    'Gibraltar',
    'Hong Kong S.A.R.',
    'Hungary',
    'India',
    'Indonesia',
    'Italy',
    'Mexico',
    'Morocco',
    'Netherlands',
    'New Zealand',
    'Norway',
    'Panama',
    'Paraguay',
    'Peru',
    'Philippines',
    'Portugal',
    'Puerto Rico',
    'Russia',
    'Singapore',
    'South Africa',
    'Spain',
    'Sweden',
    'Switzerland',
    'Thailand',
    'Turkey',
    'Ukraine',
    'Uruguay',
    'Uzbekistan',
    'Venezuela',
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const files = ['../src/uploads/country_details.json'];

            for (const file of files) {
                const jsonData = fs.readFileSync(path.join(__dirname, file));
                const data = JSON.parse(jsonData);
                const insertdata = [];
                data.map((raw) => {
                    const {
                        id,
                        name,
                        iso2,
                        iso3,
                        numeric_code,
                        phone_code,
                        currency,
                        currency_name,
                    } = raw;

                    if (countries.includes(name)) {
                        insertdata.push({
                            id,
                            name,
                            iso2,
                            iso3,
                            numeric_code,
                            phone_code,
                            currency,
                            currency_name,
                            is_active: 1,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                    } else {
                        insertdata.push({
                            id,
                            name,
                            iso2,
                            iso3,
                            numeric_code,
                            phone_code,
                            currency,
                            currency_name,
                            is_active: 0,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                    }
                });
                const tableName = path.basename(file, '.json');
                await queryInterface.bulkInsert(tableName, insertdata, {});
            }

            return Promise.resolve();
        } catch (error) {
            console.error('Error seeding data:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            const tables = ['City', 'State', 'Country'];
            for (const table of tables) {
                await queryInterface.bulkDelete(table, null, {});
            }

            return Promise.resolve();
        } catch (error) {
            console.error('Error deleting seeded data:', error);
            throw error;
        }
    },
};
