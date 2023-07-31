import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');


export const Message = sequelize.define('Message', {
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
})


export const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

export const UserSettings = sequelize.define('UserSettings', {
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

})

export const ContactList = sequelize.define('ContactList', {
	user_id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	encrypted_contact_list: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})


sequelize.sync({ force: true })