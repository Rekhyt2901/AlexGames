async function main(desiredPrice, useGeo, searchData) {
    let type;
    if (!useGeo) type = "zuhause";
    if (useGeo) type = "geo";
    let options = {
        body: {
            price: desiredPrice,
            type: type,
            searchData: searchData
        }
    };
    let data = await apppost(options);

    if (useGeo) {
        for (element in data) {
            let elementPrice = data[element].price;
            let elementInfo = data[element];
            data[element] = {
                price: elementPrice,
                stationData: elementInfo
            };
        }
    }
    if(data.length > 0) {
        console.log("Found station below price");
        clearInterval(interval);
        //notify user
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

            price.textContent = data[item].price;
            brand.textContent = data[item].stationData.brand;
            address.textContent = stationData.place + " " + stationData.street;
            if (stationData.house_number) address.textContent += " " + stationData.house_number;

            tr.appendChild(price);
            tr.appendChild(brand);
            tr.appendChild(address);
            document.getElementById("table").appendChild(tr);

            priceArray.push(data[item].price);
            trArray.push(tr);
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

async function geoSearch(desiredPrice) {
    let options = {
        body: { price: desiredPrice, type: "geo" }
    };
    let data = await apppost(options);
}

let interval;
document.getElementById("submit").onclick = () => {
    repeating();
    interval = setInterval(repeating , 900000);
}

function repeating() {
    console.log("Repeating");
    inputField = document.getElementById("input");
    if (document.getElementsByName("search")[0].checked) main(inputField.value, false, "");
    if (document.getElementsByName("search")[1].checked) {
        if ("geolocation" in navigator) {
            console.log("Geolocation available");
            navigator.geolocation.getCurrentPosition(async (position) => {
                console.log("Position found");
                let usersSearchData = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    radius: 5,
                    type: "e5",
                    sort: "price"
                };
                main(inputField.value, true, usersSearchData);
            });
        } else {
            let noGeoTr = document.createElement("tr");
            noGeoTr.textContent = "Geolocation not available";
            noGeoTr.style.backgroundColor = "#ff0000";
            document.getElementById("table").appendChild(noGeoTr);
        }
    }

}