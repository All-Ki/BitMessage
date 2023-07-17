
import {User, Message} from './models'

export function create_routes(app){
	app.get('/', (req, res) => res.send('ma bite'))


	var sampleMessage = {
		id: "1",
		text: "Hello",
		date: "2019-01-01",
		sender: "1",
		receiver: "2",
	}


	type NewMessage = {
		text: string,
		sender: number,
		receiver: number,
	}

	app.post('/messages', async (req, res) => {
		console.log(req.body);
		const message : NewMessage = req.body;
		const builtMessage = Message.build(message);
		await builtMessage.save();
		console.log(message);
		res.send(message);
	})

	app.get('/messages/:receiver/:sender', async (req, res) => {
		const receiver = req.params.receiver;
		const sender = req.params.sender;
		const msgs = await Message.findAll({
			where: {
				receiver: receiver,
				sender: sender,
			},
			order: [
				['date', 'DESC'],
			],
		})
		res.send(msgs);
	})
	app.get('/discussions/:user', async (req, res) => {
		const user = req.params.user;
		const msgs = await Message.findAll({
			where: {
				receiver: user,
			},
			group: ['sender'],
			order: [
				['date', 'DESC'],
			],
		})
		res.send(msgs);
	})
	return app;
}