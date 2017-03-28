import express from "express"
const app = express()
import path from "path"
import splitster, { server } from "../../lib/main"

app.use(express.static('dist'))

app.get('/', (req, res) => {
	
	server(splitster, res)
	
	res.sendFile(path.join(__dirname + '/usage_server.html'));
})

app.listen(3000, () => {
	console.log('Server usage app listening on port 3000!')
})