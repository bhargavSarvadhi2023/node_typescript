import { STRING } from 'sequelize';
import { DataTypes } from 'sequelize';

export const cityModel = (sequelize) => {
    const cityModel = sequelize.define('cities_detail', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'country_details',
                key: 'id',
            },
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'state_details',
                key: 'id',
            },
        },
        state_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wikiDataId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return cityModel;
};
