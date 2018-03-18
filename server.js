import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import user from './server/routes/user'

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(cookieParser())

app.use('/api', user)

app.listen(port, () => console.log(`Listening on port ${port}`))
