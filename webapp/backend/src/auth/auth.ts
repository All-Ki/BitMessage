import { CONSTANTS } from ':common/constants'; // Import the CONSTANTS class
import { NextFunction, Request, Response } from 'express';
import { Nonce } from './auth.models';
import { verify_signed_message } from ':common/functions/message_signature';
async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  const public_key = req.headers['x-public-key'] as string;
  const signature = req.headers['x-signature'] as string;
  const action = CONSTANTS.getActionFromUrl(req.url,req.method);

  if (!action) {
    return res.status(401).json({ success: false, message: 'Invalid action' });
  }

  if (!public_key || !signature) {
    return res.status(401).json({ success: false, message: 'Authentication data missing.' });
  }

  try {
    // Retrieve the nonce from the database using the public_key and action.
    const existing_nonce = await Nonce.findOne({
      where: {
        public_key: public_key,
        action: action,
      },
    });

    if (!existing_nonce) {
      return res.status(401).json({ success: false, message: 'Invalid nonce or key' });
    }

    const { nonce } = existing_nonce;

    // Verify the signature using your verification function and the retrieved nonce.
    const isValidSignature = verify_signed_message(public_key, action, nonce, signature);
    //console.log('public_key', public_key);
    //console.log('signature', signature);
    //console.log('action', action);
    console.log('nonce', nonce);
    if (!isValidSignature) {
      return res.status(401).json({ success: false, message: 'Invalid signature or key' });
    }

    // Authentication successful, proceed to the next middleware or route handler.
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export { authenticationMiddleware };