const apikey = "697486aa-c99c-fb80-6891-22b470bc284e";

baseURLumkreis = "https://creativecommons.tankerkoenig.de/json/list.php"
baseURLstaion = "https://creativecommons.tankerkoenig.de/json/prices.php"

async function umkreisSuche(searchData) {
  let requestLink = baseURLumkreis + "?lat=" + searchData.lat + "&" + "lng=" + searchData.long + "&rad=" + searchData.radius + "&sort=" + searchData.sort + "&type=" + searchData.type + "&apikey=" + apikey;
  let response = await fetch(requestLink);
  let data = await response.json();
  return data.stations;
}

async function getGeoStationsBelowPrice(desiredPrice, searchData) {
  let data = await umkreisSuche(searchData);
  let dataCopy = [];
  for (item in data) {
      if (data[item].price < desiredPrice) dataCopy.push(data[item]);
  }
  return dataCopy;
}