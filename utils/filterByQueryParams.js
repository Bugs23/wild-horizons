export function filterByQueryParams(data, queryParams) {
    
    const {country, continent, is_open_to_public} = query

    // If no search params are used, return all the data 
    if (!country && !continent && !is_open_to_public) {
        return data
    }

    // If the user serached by country, keep only the items that match the country being searched for
    if (country) {
        data = data.filter((destingation) => {
            return destingation.country.toLowerCase() === country.toLowerCase()
        })
    }

    if (continent) {
        data = data.filter((continent) => {
            return destination.continent.toLowerCase() === continent.toLowerCase()
        })
    }

    if (is_open_to_public) {
        data = data.filter((destination) => {
            return destination.is_open_to_public === JSON.parse(is_open_to_public)
        })
    }
}