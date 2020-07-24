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

async function stationsSuche(tankstellenArray) {
  let ids = "";
  tankstellenArray.forEach(id => {
    ids += id.id + ",";
  });
  ids = ids.substring(0, ids.length - 1);

  let requestLink = baseURLstaion + "?ids=" + ids + "&apikey=" + apikey;
  let response = await fetch(requestLink);
  let data = await response.json();
  return data.prices;
}

async function getStationsBelowPrice (stationArray, desiredPrice) {
  let data = await stationsSuche(stationArray);
  let returnArray = [];
  for (station in data) {
    if (data[station].status === "open" && data[station].e5 < desiredPrice) {
      let returnData = {
        price: data[station].e5,
        stationData: ""
      }
      for (i = 0; i < stationArray.length; i++) {
        if (stationArray[i].id === station) returnData.stationData = stationArray[i];
      }
      returnArray.push(returnData);
    }
  }
  return returnArray;
}

tankstellenSearchData = {
  lat: 51.47358,
  long: 7.449847,
  radius: 5,
  type: "e5",
  sort: "price"
}

let  tankstellen = [
    {
      "id": "da0256ed-2d76-4909-8b7d-55ac6c0914b1",
      "name": "Bft DORTMUND",
      "brand": "BFT",
      "street": "HAGENER STR. 18",
      "house_number": "",
      "post_code": 44225,
      "place": "DORTMUND",
      "lat": 51.477355,
      "lng": 7.459139,
      "isOpen": false
    },
    {
      "id": "d638e18a-8f86-4d7d-a67c-c97b091d935f",
      "name": "Aral Tankstelle",
      "brand": "ARAL",
      "street": "Stockumer Straße",
      "house_number": "168",
      "post_code": 44225,
      "place": "Dortmund",
      "lat": 51.4816246,
      "lng": 7.438967,
      "isOpen": true
    },
    {
      "id": "83f4ae53-67d4-4a12-8239-41fe988e7281",
      "name": "TOTAL DORTMUND",
      "brand": "TOTAL",
      "street": "STOCKUMER STR. 200",
      "house_number": "",
      "post_code": 44225,
      "place": "DORTMUND",
      "lat": 51.48183,
      "lng": 7.436307,
      "isOpen": true
    },
    {
      "id": "526278c1-0d73-414f-a038-0aa40ad2ace5",
      "name": "Klink Freie Tankstelle",
      "brand": "",
      "street": "Stockumer Str.",
      "house_number": "389",
      "post_code": 44227,
      "place": "Dortmund",
      "lat": 51.481415,
      "lng": 7.413906,
      "isOpen": false
    },
    {
      "id": "c8fbf014-a55f-4f69-ab76-4b96a6612fd6",
      "name": "Shell Dortmund Ruhrallee 125",
      "brand": "Shell",
      "street": "Ruhrallee",
      "house_number": "125",
      "post_code": 44139,
      "place": "Dortmund",
      "lat": 51.496399,
      "lng": 7.468068,
      "isOpen": true
    },
    {
      "id": "6425c986-05e9-4729-892c-4a18550fd014",
      "name": "Aral Tankstelle",
      "brand": "ARAL",
      "street": "Rheinlanddamm",
      "house_number": "103",
      "post_code": 44139,
      "place": "Dortmund",
      "lat": 51.49935,
      "lng": 7.47172,
      "isOpen": true
    },
    {
      "id": "005056ba-7cb6-1ed2-bceb-7028ebc78d23",
      "name": "star Tankstelle",
      "brand": "STAR",
      "street": "Markgrafenstraße",
      "house_number": "125a",
      "post_code": 44139,
      "place": "Dortmund",
      "lat": 51.50132,
      "lng": 7.46526,
      "isOpen": true
    },
    {
      "id": "7c99a110-8ced-4bcd-93b1-10c3b57ef213",
      "name": "Aral Tankstelle",
      "brand": "ARAL",
      "street": "Lindemannstraße",
      "house_number": "65",
      "post_code": 44137,
      "place": "Dortmund",
      "lat": 51.5014877,
      "lng": 7.451744,
      "isOpen": true
    },
    {
      "id": "005056ba-7cb6-1ed2-bceb-7b735e214d27",
      "name": "star Tankstelle",
      "brand": "STAR",
      "street": "Wittener Straße",
      "house_number": "131",
      "post_code": 44149,
      "place": "Dortmund",
      "lat": 51.50256,
      "lng": 7.41629,
      "isOpen": true
    },
    {
      "id": "e1a15081-24dd-9107-e040-0b0a3dfe563c",
      "name": "Dortmund, Am Hartweg 175",
      "brand": "HEM",
      "street": "Am Hartweg",
      "house_number": "175",
      "post_code": 44149,
      "place": "Dortmund",
      "lat": 51.497066,
      "lng": 7.403551,
      "isOpen": true
    },
    {
      "id": "e1a15081-260d-9107-e040-0b0a3dfe563c",
      "name": "Dortmund, Julius-Vogel-Str. 28",
      "brand": "GO",
      "street": "Julius-Vogel-Str.",
      "house_number": "28",
      "post_code": 44149,
      "place": "Dortmund",
      "lat": 51.490986,
      "lng": 7.388981,
      "isOpen": false
    },
    {
      "id": "fdd7576d-b31d-414e-b41e-73374ed8c39a",
      "name": "Shell Dortmund Wittener Str. 51",
      "brand": "Shell",
      "street": "Wittener Str.",
      "house_number": "51",
      "post_code": 44149,
      "place": "Dortmund",
      "lat": 51.507805,
      "lng": 7.421419,
      "isOpen": true
    },
    {
      "id": "0c117471-123c-4875-b702-99887485675a",
      "name": "Shell Dortmund Rheinische Str. 199",
      "brand": "Shell",
      "street": "Rheinische Str.",
      "house_number": "199",
      "post_code": 44147,
      "place": "Dortmund",
      "lat": 51.511779,
      "lng": 7.430413,
      "isOpen": true
    },
    {
      "id": "c96b5d11-f59c-428c-9b25-7af3255ac60d",
      "name": "Aral Tankstelle",
      "brand": "ARAL",
      "street": "Heiliger Weg / Löwenstr.",
      "house_number": "",
      "post_code": 44135,
      "place": "Dortmund",
      "lat": 51.5095,
      "lng": 7.473947,
      "isOpen": true
    },
    {
      "id": "b547911e-8b2a-4ed8-89d3-98b3155b0421",
      "name": "Dortmund",
      "brand": "Mr. Wash Autoservice AG",
      "street": "Heiliger Weg",
      "house_number": "68",
      "post_code": 44141,
      "place": "Dortmund",
      "lat": 51.5072648,
      "lng": 7.4751365,
      "isOpen": false
    },
    {
      "id": "67f08580-98a7-403f-b3a4-6f76338ea5d6",
      "name": "Esso Tankstelle",
      "brand": "ESSO",
      "street": "MAERKISCHE STR. 239",
      "house_number": "",
      "post_code": 44141,
      "place": "DORTMUND",
      "lat": 51.496456,
      "lng": 7.490302,
      "isOpen": true
    },
    {
      "id": "4158a49f-3ec1-4160-9607-0530f8b0722b",
      "name": "Aral Tankstelle",
      "brand": "ARAL",
      "street": "Westfalendamm",
      "house_number": "166",
      "post_code": 44141,
      "place": "Dortmund",
      "lat": 51.50406,
      "lng": 7.498477,
      "isOpen": true
    },
    {
      "id": "6171d89d-8865-4752-90e0-74f14472578e",
      "name": "Bavaria Petrol",
      "brand": "Bavaria Petrol",
      "street": "Hermannstraße",
      "house_number": "105-109",
      "post_code": 44263,
      "place": "Dortmund",
      "lat": 51.4873924,
      "lng": 7.510437,
      "isOpen": true
    },
    {
      "id": "51d4b66f-a095-1aa0-e100-80009459e03a",
      "name": "JET DORTMUND HERMANNSTR. 182",
      "brand": "JET",
      "street": "HERMANNSTR. 182",
      "house_number": "",
      "post_code": 44263,
      "place": "DORTMUND",
      "lat": 51.4854,
      "lng": 7.51694,
      "isOpen": true
    },
    {
      "id": "5f44d3db-7c17-4c44-a7bd-354e3372d316",
      "name": "Adrian Turcu",
      "brand": "Westfalen",
      "street": "Benninghofer Str.",
      "house_number": "265",
      "post_code": 44267,
      "place": "Dortmund",
      "lat": 51.46857,
      "lng": 7.5159,
      "isOpen": false
    },
    {
      "id": "54dae2ff-20b9-4e51-b41d-613b51142430",
      "name": "TOTAL DORTMUND",
      "brand": "TOTAL",
      "street": "PREINSTR. 126",
      "house_number": "",
      "post_code": 44265,
      "place": "DORTMUND",
      "lat": 51.468021,
      "lng": 7.492767,
      "isOpen": true
    },
    {
      "id": "c8ee4372-2362-43e8-9204-8f26b2fb6054",
      "name": "Shell Dortmund Wellinghofen Holtbrügge 25",
      "brand": "Shell",
      "street": "Holtbrügge",
      "house_number": "25",
      "post_code": 44265,
      "place": "Dortmund Wellinghofen",
      "lat": 51.468087,
      "lng": 7.482237,
      "isOpen": true
    },
    {
      "id": "1a20d1fe-060a-4c09-913b-e4e616220325",
      "name": "Aral Tankstelle",
      "brand": "ARAL",
      "street": "Zeche Crone",
      "house_number": "2",
      "post_code": 44265,
      "place": "Dortmund",
      "lat": 51.47233,
      "lng": 7.485391,
      "isOpen": true
    },
    {
      "id": "f4a7f1f2-7ce8-4806-835b-91c81c789fbb",
      "name": "Aral Tankstelle",
      "brand": "ARAL",
      "street": "Hagener Straße",
      "house_number": "156",
      "post_code": 44225,
      "place": "Dortmund",
      "lat": 51.4673958,
      "lng": 7.460269,
      "isOpen": true
    },
    {
      "id": "1416ff7c-ed18-44ad-b3cf-73777c7d3f43",
      "name": "Esso Tankstelle",
      "brand": "ESSO",
      "street": "FRIEDRICH-EBERT-STR. 91",
      "house_number": "",
      "post_code": 58454,
      "place": "WITTEN",
      "lat": 51.451853,
      "lng": 7.399637,
      "isOpen": true
    }
  ];