import { DataTypes } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export const outletModel = (sequelize) => {
    const outletModel = sequelize.define(
        'outlet_details',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            discriptions: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            map_locations: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            country_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            city_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            state_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            paranoid: true,
        },
    );

    // userModel.associate = (models) => {
    //     userModel.hasMany(models, {});
    // };

    return outletModel;
};
