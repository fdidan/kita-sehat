let G1;
let G2;
let G3;
let G4;
let G5;
let G6;
let G7;
let G8;
let G9;
let G10;
let G11;
let G12;
let G13;
let G14;
let G15;
let G16;
let G17;
let G18;
function saveValue(question) {
    switch (question) {
        case "G1":
        G1 = "yes";
        break;
        case "G2":
        G2 = "yes";
        break;
        case "G3":
        G3 = "yes";
        break;
        case "G4":
        G4 = "yes";
        break;
        case "G5":
        G5 = "yes";
        break;
        case "G6":
        G6 = "yes";
        break;
        case "G7":
        G7 = "yes";
        break;
        case "G8":
        G8 = "yes";
        break;
        case "G9":
        G9 = "yes";
        break;
        case "G10":
        G10 = "yes";
        break;
        case "G11":
        G11 = "yes";
        break;
        case "G12":
        G12 = "yes";
        break;
        case "G13":
        G13 = "yes";
        break;
        case "G14":
        G14 = "yes";
        break;
        case "G15":
        G15 = "yes";
        break;
        case "G16":
        G16 = "yes";
        break;
        case "G17":
        G17 = "yes";
        break;
        case "G18":
        G18 = "yes";
        break;
    }
}  
function akhir(){
    if (G1 === "yes" && G3 === "yes" && G4 === "yes" && G8 === "yes" && G17 === "yes") {
        document.write("gastritis")
    }else if (G5 === "yes" && G18 === "yes" && G3 === "yes" && G8 === "yes" && G7 === "yes" && G6 === "yes" && G9 === "yes" && G10 === "yes" && G17 === "yes") {
        document.write("gaerd")
    }else if (G17 === "yes" && G8 === "yes" && G11 === "yes" && G12 === "yes" && G3 === "yes" && G14 === "yes" && G13 === "yes" && G1 === "yes" && G2 === "yes" && G15 === "yes" && G4 === "yes") {
        document.write("Tukak Peptik")
    }else if (G1 === "yes" && G3 === "yes" && G4 === "yes" && G17 === "yes" && G12 === "yes" ) {
        document.write("gastroparesis")
    }else if (G15 === "yes" && G12 === "yes" && G17 === "yes" && G1 === "yes" && G3 === "yes" && G4 === "yes" && G14 === "yes" ) {
        document.write("Dyspepsia Fungsional")
    }else{
        document.write("periksa ke dokter")
    }
}