async function main(desiredPrice, searchData) {
    let options = {
        body: {
            price: desiredPrice,
            searchData: searchData
        }
    };
    let data = await apppost(options);

    for (element in data) {
        let elementPrice = data[element].price;
        let elementInfo = data[element];
        data[element] = {
            price: elementPrice,
            stationData: elementInfo
        };
    }
    if (data.length > 0) {
        console.log("Found stations below price");
        clearInterval(interval);
        if (timer > 1) notifyUser();
    }
    console.log(data);

    //two arrays used to find lowest priced stations
    let trArray = [];
    let priceArray = [];

    while (document.getElementById("table").firstChild) document.getElementById("table").firstChild.remove(); //empties the table

    //iterates through stations and displays price, brand and address
    if (data.length > 0) {
        for (item in data) {
            let stationData = await data[item].stationData;

            let tr = document.createElement("tr");

            let price = document.createElement("td");
            let brand = document.createElement("td");
            let address = document.createElement("td");
            let distance = document.createElement("td");

            price.textContent = data[item].price + "€";
            brand.textContent = data[item].stationData.brand;
            address.textContent = stationData.place + " " + stationData.street;
            if (stationData.house_number) address.textContent += " " + stationData.house_number;
            distance.textContent = calculateDistanceBetweenCoords(myLat, myLong, stationData.lat, stationData.lng) + "km";

            tr.appendChild(price);
            tr.appendChild(brand);
            tr.appendChild(address);
            tr.appendChild(distance);
            
            if (data[item].price) {
                document.getElementById("table").appendChild(tr);
                priceArray.push(data[item].price);
                trArray.push(tr);
            }
        }
    } else { //wenn keine für den preis vorhanden ist
        let emptytr = document.createElement("tr");
        emptytr.textContent = "no stations available at that price";
        emptytr.style.fontSize = "2rem";
        emptytr.style.backgroundColor = "#ff0000";
        document.getElementById("table").appendChild(emptytr);
    }

    //finds lowest Priced stations and marks cyan
    let lowestPrice = 10;
    for (i in priceArray) {
        if (priceArray[i] < lowestPrice) lowestPrice = priceArray[i];
    }
    for (i in priceArray) {
        if (priceArray[i] <= lowestPrice) trArray[i].style.setProperty("background-color", "#00ffff");;
    }

}

function notifyUser() {
    Push.create("Tankstelle Verfügbar!", {
        tag: "TankstelleGefunden",
        requireInteraction: true,
        vibrate: [200],
        body: "Schau auf der Website nach wo sie zu funden ist!",
        onClick: () => {
            window.focus();
        }
    });
}

async function geoSearch(desiredPrice) {
    let options = {
        body: { price: desiredPrice, type: "geo" }
    };
    let data = await apppost(options);
}

let interval;
let timer;
document.getElementById("submit").onclick = () => {
    timer = 0;
    repeating();
    interval = setInterval(repeating, 90000);
}

let myLat;
let myLong;
function repeating() {
    timer++;
    console.log("Repeating");
    inputField = document.getElementById("input");
    let type;
    if (document.getElementsByName("search")[0].checked) type = "diesel";
    if (document.getElementsByName("search")[1].checked) type = "e5";
    if (document.getElementsByName("search")[2].checked) type = "e10";
    if ("geolocation" in navigator) {
        console.log("Geolocation available");
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log("Position found");
            myLat = position.coords.latitude;
            myLong = position.coords.longitude;
            let usersSearchData = {
                lat: myLat,
                long: myLong,
                radius: 5,
                type: type,
                sort: "price"
            };
            main(inputField.value, usersSearchData);
        });
    } else {
        let noGeoTr = document.createElement("tr");
        noGeoTr.textContent = "Geolocation not available";
        noGeoTr.style.backgroundColor = "#ff0000";
        document.getElementById("table").appendChild(noGeoTr);
    }

}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function calculateDistanceBetweenCoords(lat1, long1, lat2, long2) {
    let earthRadiusKm = 6371;

    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(long2 - long1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLong / 2) * Math.sin(dLong / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadiusKm * c + "";
    return parseFloat(distance).toFixed(2);
}