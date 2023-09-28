import { Request, Response } from "express";
import * as Accounts from 'web3-eth-accounts';
import { User } from "./users.models";

export class Users{
	public static async login (req: Request, res: Response) {
		const public_key = req.body.public_key;
		const encrypted_message = req.body.encrypted_message;
		const rsa_public_key = req.body.rsa_public_key;
		if(!public_key || !encrypted_message || !rsa_public_key){
		  res.status(401).json({ success: false, message: 'Invalid signature or key' });
		  return
		}


		console.log('Public Key:' + public_key);
		console.log('Encrypted Message:' + encrypted_message);

		var verifier = Accounts.recover('Login from ' + public_key +rsa_public_key, encrypted_message);

		if (verifier === public_key) {

		  const userData = await User.findOne({
			where: {
			  public_key: public_key,
			},
		  });
		  if (!userData || userData.rsa_public_key !== rsa_public_key) {
			const user = {
			  public_key: public_key,
			  rsa_public_key: rsa_public_key,
			};
			const newUser = User.build(user);
			await newUser.save();
		  }

		  res.status(200).json({ success: true, message: 'Login successful' });
		} else {
		  res.status(401).json({ success: false, message: 'Invalid signature or key' });
		}
	  }

	  static async  get_user_rsa_public_key(public_key: string): Promise<string> {
		const user = await User.findOne({
		  where: {
			public_key: public_key,

		  },
		});
		if (user) {
		  return user.rsa_public_key;
		}
		throw new Error('User not found');
	}
}