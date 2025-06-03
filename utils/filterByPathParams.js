export function filterByPathParams(data, locationType, locationName) {

    return destinations.filter((destination) => {
        return destination[locationType].toLowerCase() === locationName.toLowerCase()
    })

}