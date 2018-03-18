import path from 'path'
import Datastore from 'nedb'

const db = new Datastore({filename: path.join(__dirname, '/../../db/users.db'), autoload: true})

export default db
