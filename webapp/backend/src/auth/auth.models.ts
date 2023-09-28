import { Table, Column,Model } from "sequelize-typescript";

@Table
export class Nonce extends Model{
	@Column
	public_key: string;
	@Column
	nonce: string;
	@Column
	action: string;
}