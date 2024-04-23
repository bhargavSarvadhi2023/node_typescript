import { DataTypes } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export const otpModel = (sequelize) => {
    const otpModel = sequelize.define(
        'otp_details',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            paranoid: true,
        },
    );

    // userModel.associate = (models) => {
    //     userModel.hasMany(models, {});
    // };

    return otpModel;
};
