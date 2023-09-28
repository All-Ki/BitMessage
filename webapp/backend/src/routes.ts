
import express, { Request, Response, Express } from 'express';
import { Messages } from './messages';
import { Users } from './users';
import { Message } from './messages/messages.models';
import {  ContactList } from './users/users.models';
import { authenticationMiddleware } from './auth/auth';
import { Nonce } from './auth/auth.models';

class Routes {
	private app: Express;

	constructor(app: Express) {
	  this.app = app;
	  this.createRoutes();
	}

	private rootHandler(req: Request, res: Response) {
	  res.send('Working !');
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

	private async userSettingsHandler(req: Request, res: Response) {
	  const public_key = req.body.public_key;
	  const message = req.body.message;
	  const settings = req.body.settings;
	  res.json(settings);
	}


	private async nonceHandler(req: Request, res: Response) {
	const {public_key, action} = req.body;
	  const existing_nonce = await Nonce.findOne({
		where: {
		  public_key: public_key,
		  action: action,
		},
	  });
	  if(existing_nonce){
		await existing_nonce.destroy();
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
	private async getContactsHandler(req: Request, res: Response) {
		const public_key = req.body.public_key;
		const existing_contacts = await ContactList.findOne({
		  where: {
			public_key: public_key,
		  },
		});
		if (existing_contacts) {
		  res.json(existing_contacts.encrypted_contact_list);
		} else {
		  res.json([]);
		}
	  }


	private async saveContactsHandler(req: Request, res: Response) {
		const public_key = req.body.public_key;
		const contacts = req.body.contacts;

		const existing_contacts = await ContactList.findOne({
		  where: {
			public_key: public_key,
		  },
		});
		if (existing_contacts) {
		  await existing_contacts.destroy();
		}
		const new_contacts = {
		  public_key: public_key,
		  encrypted_contact_list: contacts,
		};
		await ContactList.build(new_contacts).save();
		res.json(contacts);

	}
	createRoutes(): Express {
	  this.app.get('/', this.rootHandler.bind(this));
	  this.app.post('/messages',authenticationMiddleware, Messages.new_message);
	  this.app.get('/messages/:receiver/:sender',authenticationMiddleware, this.getMessagesHandler.bind(this));
	  this.app.get('/discussions/:user', this.discussionsHandler.bind(this));
	  this.app.post('/login', Users.login);
	  this.app.post('/user_settings',authenticationMiddleware, this.userSettingsHandler.bind(this));
	  this.app.get('/contacts', this.getContactsHandler.bind(this));
	  this.app.post('/contacts', this.saveContactsHandler.bind(this));
	  this.app.post('/nonce', this.nonceHandler.bind(this));

	  return this.app;
	}
  }

  export { Routes };