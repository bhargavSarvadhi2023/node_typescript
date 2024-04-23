import { DataTypes } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export const userModel = (sequelize) => {
    const userModel = sequelize.define(
        'user_details',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ['0', '1', '2'],
            },
        },
        {
            paranoid: true,
        },
    );

    userModel.afterValidate((data) => {
        if (data.changed('password')) {
            data.password = hashSync(data.password, genSaltSync(12));
        }
    });
    userModel.prototype.authenticate = function (val: string) {
        if (compareSync(val, this.password)) {
            return this;
        } else {
            return false;
        }
    };

    // userModel.associate = (models) => {
    //     userModel.hasMany(models, {});
    // };

    return userModel;
};
