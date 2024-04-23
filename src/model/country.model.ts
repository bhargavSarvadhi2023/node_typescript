import { STRING } from 'sequelize';
import { DataTypes } from 'sequelize';

export const countryModel = (sequelize) => {
    const countryModel = sequelize.define('country_detail', {
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
        iso2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        iso3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numeric_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });
    return countryModel;
};
