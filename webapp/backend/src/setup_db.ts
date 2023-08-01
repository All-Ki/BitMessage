import { Sequelize } from 'sequelize-typescript';
import { Message, User, UserSettings, ContactList, Nonce } from './models-ts';

const sequelize = new Sequelize('sqlite::memory:');
sequelize.addModels([Message, User, UserSettings, ContactList, Nonce]);
sequelize.sync();


export { sequelize };