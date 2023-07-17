import { group, log } from 'console';
import cors from 'cors'
import express from 'express'
import {User, Message} from './models'
const PORT = 5656
/**
 * On créé une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors())
/*
 * Homepage (uniquement necessaire pour cette demo)
 */
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
	log(message);
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

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(PORT, () => console.log('Silence, ça tourne.'))