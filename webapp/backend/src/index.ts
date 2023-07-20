import cors from 'cors'
import express from 'express'
import { create_routes } from './routes'
import {CONSTANTS} from '../../common/constants'
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
create_routes(app);
/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(PORT, () => console.log('Silence, ça tourne.'))