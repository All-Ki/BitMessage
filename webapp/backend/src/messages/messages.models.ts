import { Table, Column,Model } from "sequelize-typescript";

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