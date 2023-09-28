import { Table, Column,Model } from "sequelize-typescript";

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

