import { privateKeyToAccount, recover } from "web3-eth-accounts";

export function build_signed_message_for_verification(private_key: string, action: string, nonce: string): string {
	const acc = privateKeyToAccount(private_key);
	const signed = acc.sign(action + nonce);
	return signed.signature;
}

export function verify_signed_message(public_key: string, action: string, nonce: string, signature: string): boolean {
	return recover(action + nonce, signature) === public_key;
}