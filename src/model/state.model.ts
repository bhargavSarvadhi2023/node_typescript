import { STRING } from 'sequelize';
import { DataTypes } from 'sequelize';

export const stateModel = (sequelize) => {
    const stateModel = sequelize.define('state_detail', {
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
        country_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_code: {
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
    });
    return stateModel;
};
