import { verify_signed_message } from '../../common/functions/message_signature';
import { CONSTANTS } from ':common/constants'; // Import the CONSTANTS class
import { Nonce } from './models-ts';
async function verifyAuthentication(req, res, next) {
	const { public_key, signature } = req.body;
	const action = CONSTANTS.getActionFromUrl(req.url);
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
		}
	  });

	  if (!existing_nonce) {
		return res.status(401).json({ success: false, message: 'Invalid nonce or key' });
	  }

	  const { nonce } = existing_nonce;

	  // Verify the signature using your verification function and the retrieved nonce.
	  const isValidSignature = verify_signed_message(public_key, action, nonce, signature);

	  if (!isValidSignature) {
		return res.status(401).json({ success: false, message: 'Invalid signature or key' });
	  }

	  // Authentication successful, proceed to the next middleware or route handler.
	  next();
	} catch (error) {
	  return res.status(500).json({ success: false, message: 'Internal server error' });
	}
  }
