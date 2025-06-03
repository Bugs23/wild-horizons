import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSON } from "./utils/sendJSON.js"
import {filterByPathParams} from "./utils/filterByPathParams.js"
import {filterByQueryParams} from "./utils/filterByQueryParams.js"

const PORT = 8000

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams.entries())

    if (urlObj.pathname === '/api' && req.method === 'GET') {

        // filteredData holds whatever gets returned by filterByQueryParams
        let filteredData = filterByQueryParams(destinations, queryObj)

        console.log(queryObj)

        sendJSON(res, 200, filteredData)
        
    } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        // const continent = decodeURIComponent(req.url.split('/').pop())
        const continent = req.url.split('/').pop()
        const filteredData = filterByPathParams(destinations, "continent", continent)
        sendJSON(res, 300, filteredData)

    } else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        // const country = decodeURIComponent(req.url.split('/').pop())
        const country = req.url.split('/').pop()
        const filteredData = filterByPathParams(destinations, "country", country)
        sendJSON(res, 300, filteredData)

    } else {
        sendJSON(res, 404, { error: "not found", message: "The requested route doesn't exist"})
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/continent/asia`)
})