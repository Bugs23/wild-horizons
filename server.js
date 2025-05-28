import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSON } from "./utils/sendJSON.js"
import {filteredData} from "./utils/filteredData.js"

const PORT = 8000

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()
  
    if (req.url === '/api' && req.method === 'GET') {
        sendJSON(res, 200, destinations)
        
    } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        // const continent = decodeURIComponent(req.url.split('/').pop())
        const continent = req.url.split('/').pop()
        const filteredData = filteredData(destinations, "continent", continent)
        sendJSON(res, 300, filteredData)

    } else if (req.url.startsWith('/api/country') && req.method === 'GET') {
    // const country = decodeURIComponent(req.url.split('/').pop())
    const country = req.url.split('/').pop()
    const filteredData = filteredData(destinations, "country", country)
    sendJSON(res, 300, filteredData)

} else {
        sendJSON(res, 404, { error: "not found", message: "The requested route doesn't exist"})
    }
  })

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`)
})