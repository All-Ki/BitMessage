import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
export class Message extends Model{
	@Column
	text: string;

	@Column
	date: Date;

	@Column
	sender: string;

	@Column
	receiver: string;

	@Column
	client_id: string;
}

@Table
export class User extends Model{
	@Column({primaryKey: true})
	public_key: string;
	@Column
	rsa_public_key: string;
}

@Table
export class UserSettings extends Model{
	@Column({primaryKey: true})
	public_key: string;
	@Column
	theme: string;
	@Column
	preferred_network: string;
	@Column
	backup_contacts: boolean;
	@Column
	backup_network: string;
}

@Table
export class ContactList extends Model{
	@Column({primaryKey: true})
	public_key: string;
	@Column
	encrypted_contact_list: string;
}

@Table
export class Nonce extends Model{
	@Column
	public_key: string;
	@Column
	nonce: string;
	@Column
	action: string;
}