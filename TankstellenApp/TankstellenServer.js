async function getStations(desiredPrice, useGeo, searchData) {
    if (!useGeo) {
        return await getStationsBelowPrice(tankstellen, desiredPrice);
    } else {
        return await getGeoStationsBelowPrice(desiredPrice, searchData);
    }
}



async function apppost(req) {
    console.log("Requested Price: " + req.body.price);
    let resData;
    resData = await getStations(req.body.price, true, req.body.searchData);
    return resData;
};