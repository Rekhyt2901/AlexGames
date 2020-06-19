if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(async position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let latitudeP = document.createElement("p");
        let longitudeP = document.createElement("p");

        document.body.appendChild(latitudeP);
        document.body.appendChild(longitudeP);

        latitudeP.textContent = "Latitude: " + latitude + "°";
        longitudeP.textContent = "Longitude: " + longitude + "°";

        document.getElementById("submit").onclick = async () => {
            const data = {
                name: document.getElementById("name").value,
                userIPAdress: userip, 
                lat: latitude, 
                lon: longitude,
                sendTime: Date.now()
            };
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };
            
            const response = await fetch("/api", options);
            const json = await response.json();
            console.log("Servers Response:");
            console.log(json);
        }
    });
} else {
    console.log("geolocation unavailable");
}