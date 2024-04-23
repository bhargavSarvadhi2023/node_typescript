'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const files = ['../src/uploads/state_details.json'];

            for (const file of files) {
                const jsonData = fs.readFileSync(path.join(__dirname, file));
                const data = JSON.parse(jsonData);
                const insertdata = [];
                data.map((raw) => {
                    const {
                        id,
                        name,
                        country_id,
                        country_code,
                        country_name,
                        state_code,
                        latitude,
                        longitude,
                    } = raw;

                    insertdata.push({
                        id,
                        name,
                        country_id,
                        country_code,
                        country_name,
                        state_code,
                        latitude,
                        longitude,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
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
