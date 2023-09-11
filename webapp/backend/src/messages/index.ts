import { Request, Response } from "express";
import { Message } from "~/models";
type NewMessage = {
	text: string;
	sender: number;
	receiver: number;
	client_id: string;
	id?: number;
	date?: Date;
  };
export class Messages {
	static async new_message (req: Request, res: Response) {
		console.log(req.body);
		const message: NewMessage = req.body;
		message.id = undefined;
		const builtMessage = Message.build(message);
		let ret = await builtMessage.save();
		console.log(ret);
		res.send(message);
	  }
}