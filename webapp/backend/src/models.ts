import { Sequelize, DataTypes, InferAttributes, Model, CreationOptional } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');


export class Message extends Model<InferAttributes<Message>> {
	declare id: CreationOptional<number>;
	declare client_id: string;
	declare text: string;
	declare date: Date;
	declare sender: string;
	declare receiver: string;
}

Message.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	client_id:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	sender: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	receiver: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {sequelize})

export class User extends Model<InferAttributes<User>> {
	declare id:CreationOptional<number>;
	declare username: string;
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {sequelize})

export class UserSettings extends Model<InferAttributes<UserSettings>> {
	declare public_key: string;
	declare theme: string;
	declare preferred_network: string;
	declare backup_contacts: boolean;
	declare backup_network: string;
}
UserSettings.init({
	public_key: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
		},
	theme: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'dark'
	},
	preferred_network: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'BitMessage'
	},
	backup_contacts: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true
	},
	backup_network: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'BitMessage'
	},

}, {sequelize})

export class ContactList extends Model<InferAttributes<ContactList>> {
	declare user_id: string;
	declare encrypted_contact_list: string;
}
ContactList.init({
	user_id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	encrypted_contact_list: {
		type: DataTypes.STRING,
		allowNull: false,
	},
},{sequelize})

export class Nonce extends Model<InferAttributes<Nonce>> {
	declare user_id: string;
	declare request_id: string;
	declare nonce: string;
}
Nonce.init({
	user_id: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	request_id: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	nonce: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {sequelize})

sequelize.sync({ force: true })