import { Sequelize } from 'sequelize-typescript';
import { Nonce } from './auth/auth.models';
import { Message } from './messages/messages.models';
import { User, UserSettings, ContactList } from './users/users.models';

const sequelize = new Sequelize('sqlite::memory:',{logging: false});
sequelize.addModels([Message, User, UserSettings, ContactList, Nonce]);
sequelize.sync();


export { sequelize };