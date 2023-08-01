
import {Message, Nonce} from './models-ts'
import * as Accounts from 'web3-eth-accounts';

export function create_routes(app){
	app.get('/', (req, res) => res.send('ma bite'))

	type NewMessage = {
		text: string,
		sender: number,
		receiver: number,
		client_id: string,
		id?: number,
		date?: Date,

	}

	app.post('/messages', async (req, res) => {
		console.log(req.body);
		const message : NewMessage = req.body;
		message.id = undefined;
		const builtMessage = Message.build(message);
		let ret = await builtMessage.save();
		console.log(ret);
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

		var verifier = Accounts.recover('Login from ' + public_key , encrypted_message);

		if (verifier === public_key){
			res.status(200).json({ success:true, message: 'Login successful' });
		} else {
			res.status(401).json({ success: false, message: 'Invalid signature or key'});
		}

	})
	app.post('/user_settings', async (req, res) => {
		const public_key = req.body.public_key;
		const message = req.body.message;
		const settings = req.body.settings;
		res.json(settings)
	})

	app.post('/contacts', async (req, res) => {
		const public_key = req.body.public_key;
		const message = req.body.message;
		const contacts = req.body.contacts;
		res.json(contacts)
	})
	app.post('/nonce', async (req, res) => {
		const public_key = req.body.public_key;
		const request_id = req.body.request_id;
		const request_type = req.body.request_type;
		const existing_nonce = await Nonce.findOne({
			where: {
				public_key: public_key,
				request_id: request_id,
				request_type: request_type,
			}
		})
		if(existing_nonce){
			res.json({nonce: existing_nonce})
			return;
		}
		const nonce_value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		const nonce ={
			public_key: public_key,
			request_id: request_id,
			request_type: request_type,
			nonce: nonce_value,
		}
		await Nonce.build(nonce).save();
		res.json({nonce: nonce.nonce})
	})
	return app;
}
