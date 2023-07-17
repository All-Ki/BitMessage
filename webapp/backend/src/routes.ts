
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
	app.post('/login', async (req, res) => {
		const public_key = req.body.public_key;
		const encrypted_message = req.body.encrypted_message;

		console.log("Public Key:" + public_key);
		console.log("Encrypted Message:" + encrypted_message);
		
		res.send('OK')
	})

	return app;
}
