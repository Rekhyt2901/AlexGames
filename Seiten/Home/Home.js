{
    function convertSystems() {
        //var input = prompt("enter number");
        var input = document.forms["form"]["value"].value;
        console.clear();

        if(document.forms["form"]["whatToWhat"].value == "otd") {
            document.getElementById("li1").innerHTML = (input + " in Decimal to Decimal = " + input);
            document.getElementById("li2").innerHTML = (input + " in Binary to Decimal = " + Number.parseInt(input, 2));
            document.getElementById("li3").innerHTML = (input + " in Octal to Decimal = " + Number.parseInt(input, 8));
            document.getElementById("li4").innerHTML = (input + " in Hexadecimal to Decimal = " + Number.parseInt(input, 16));
        } else {
            document.getElementById("li1").innerHTML = (input + " in Decimal to Decimal = " + input);
            document.getElementById("li2").innerHTML = (input + " in Decimal to Binary = " + Number.parseInt(input).toString(2));
            document.getElementById("li3").innerHTML = (input + " in Decimal to Octal = " + Number.parseInt(input).toString(8));
            document.getElementById("li4").innerHTML = (input + " in Decimal to Hexadecimal = " + Number.parseInt(input).toString(16));
        }
    }
}