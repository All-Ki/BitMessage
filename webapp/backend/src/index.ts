import { log } from 'console';
import cors from 'cors'
import express from 'express'
import {User, Message} from './models'
import { Sequelize } from 'sequelize';
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
app.post('/messages', (req, res) => {
	console.log(req.body);
	const message : NewMessage = req.body;
	const builtMessage = Message.build(message);
	builtMessage.save();
	log(message);
	res.send(message);
})

app.get('/messages/:receiver', async (req, res) => {
	const receiver = req.params.receiver;
	const msgs = await Message.findAll({
		where: {
			receiver: receiver,
		}
	})
	res.send(msgs);
})
/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(PORT, () => console.log('Silence, ça tourne.'))