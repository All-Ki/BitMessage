
import express, { Request, Response, Express } from 'express';
import { Message, Nonce } from './models-ts';
import * as Accounts from 'web3-eth-accounts';
import { authenticationMiddleware } from './verifyAuthentication';
type NewMessage = {
	text: string;
	sender: number;
	receiver: number;
	client_id: string;
	id?: number;
	date?: Date;
  };
class Routes {
	private app: Express;

	constructor(app: Express) {
	  this.app = app;
	}

	private rootHandler(req: Request, res: Response) {
	  res.send('ma bite');
	}

	private async messagesHandler(req: Request, res: Response) {
	  console.log(req.body);
	  const message: NewMessage = req.body;
	  message.id = undefined;
	  const builtMessage = Message.build(message);
	  let ret = await builtMessage.save();
	  console.log(ret);
	  res.send(message);
	}

	private async getMessagesHandler(req: Request, res: Response) {
	  const receiver = req.params.receiver;
	  const sender = req.params.sender;
	  const msgs = await Message.findAll({
		where: {
		  receiver: receiver,
		  sender: sender,
		},
		order: [['date', 'DESC']],
	  });

	  res.send(msgs);
	}

	private async discussionsHandler(req: Request, res: Response) {
	  const user = req.params.user;
	  const msgs = await Message.findAll({
		where: {
		  receiver: user,
		},
		group: ['sender'],
		order: [['date', 'DESC']],
	  });

	  res.send(msgs);
	}

	private async loginHandler(req: Request, res: Response) {
	  const public_key = req.body.public_key;
	  const encrypted_message = req.body.encrypted_message;

	  console.log('Public Key:' + public_key);
	  console.log('Encrypted Message:' + encrypted_message);

	  var verifier = Accounts.recover('Login from ' + public_key, encrypted_message);

	  if (verifier === public_key) {
		res.status(200).json({ success: true, message: 'Login successful' });
	  } else {
		res.status(401).json({ success: false, message: 'Invalid signature or key' });
	  }
	}

	private async userSettingsHandler(req: Request, res: Response) {
	  const public_key = req.body.public_key;
	  const message = req.body.message;
	  const settings = req.body.settings;
	  res.json(settings);
	}

	private async contactsHandler(req: Request, res: Response) {
	  const public_key = req.body.public_key;
	  const message = req.body.message;
	  const contacts = req.body.contacts;
	  res.json(contacts);
	}

	private async nonceHandler(req: Request, res: Response) {
	  const public_key = req.body.public_key;
	  const action = req.body.action;
	  const existing_nonce = await Nonce.findOne({
		where: {
		  public_key: public_key,
		  action: action,
		},
	  });

	  if (existing_nonce) {
		res.json({ nonce: existing_nonce });
		return;
	  }

	  const nonce_value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

	  const nonce = {
		public_key: public_key,
		action: action,
		nonce: nonce_value,
	  };

	  await Nonce.build(nonce).save();
	  res.json({ nonce: nonce.nonce });
	}

	createRoutes(): Express {
	  this.app.get('/', this.rootHandler.bind(this));
	  this.app.post('/messages', this.messagesHandler.bind(this));
	  this.app.get('/messages/:receiver/:sender', this.getMessagesHandler.bind(this));
	  this.app.get('/discussions/:user', this.discussionsHandler.bind(this));
	  this.app.post('/login', this.loginHandler.bind(this));
	  this.app.post('/user_settings', this.userSettingsHandler.bind(this));
	  this.app.post('/contacts', this.contactsHandler.bind(this));
	  this.app.post('/nonce', this.nonceHandler.bind(this));

	  return this.app;
	}
  }

  export { Routes };