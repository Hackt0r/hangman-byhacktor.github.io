
var szavak = ["MANUEL", "FRIGYES", "GUSZTÁV", "FEHÉR", "RIBANC", "JÉGCSÚCS", "LÓFÜTTY", "FASZ", "ARANKA", "EKHOE", "KOLGEIGHT", "SUZUKI", "WALTER"];
var gomb = document.getElementById("newgame");
var gombcont = document.querySelector(".butcont");
var ember = document.querySelector(".emberimg");
var adottszo = [];
var abc2 = Array.from(document.querySelectorAll(".input"));
var bebetuk = [];
var talalat = 0;
var talalatchar = 0;
function szav() {
    if (szavak.length > 0) {
        let szoc = document.getElementById("szocontainer");
        szoc.replaceChildren();
        //random index
        let aszam = Math.floor(Math.random() * szavak.length);
        //eltarolom a szot
        let aszo = szavak[aszam];
        for (var i = 0; i < aszo.length; i++) {
            let div = document.createElement("div");
            div.className = "betucontainer";
            let betudiv = document.createElement("div");
            betudiv.className = "betu"
            let abetu = document.createTextNode(aszo[i]);
            betudiv.appendChild(abetu);
            div.appendChild(betudiv);
            document.getElementById("szocontainer").appendChild(div);
        }
        adottszo = Array.from(document.querySelectorAll('.betu'));
        for (var i = 0; i < bebetuk.length; i++)
            for (var j = 0; j < abc2.length; j++)
                if (bebetuk[i] == abc2[j].innerHTML)
                    abc2[j].style = "";
        for (var i = 0; i < abc2.length; i++) {
            abc2[i].setAttribute('onclick', 'inputlogger(' + (i + 1) + ')');
            abc2[i].style.pointerEvents = "auto";
        }
        bebetuk = [];
        talalat = 0;
        gombcont.style.opacity = 0;
        ember.src = "1s.png";
        gomb.setAttribute('onclick', '');
        //kitorli a szot - hint
        let index = szavak.indexOf(aszo);
        szavak.splice(index, 1);
    }
}

function inputlogger(szam) {
    for (var i = 1; i <= abc2.length; i++) {
        if (szam == i && !bebetuk.includes(abc2[i - 1].innerHTML)) {
            abc2[i - 1].style.color = "rgb(170, 170, 170)";
            abc2[i - 1].style.border = "rgb(120, 120, 120) solid 2px";
            abc2[i - 1].style.opacity = "70%";
            console.log(abc2[i - 1].innerHTML);
            bebetuk.push(abc2[i - 1].innerHTML);
            lathato();
        }
    }
    if (bebetuk.length - talalatchar == 0);
    else if (bebetuk.length - talalatchar == 1)
        ember.src = "2s.png";

    else if (bebetuk.length - talalatchar == 2)
        ember.src = "3s.png";

    else if (bebetuk.length - talalatchar == 3)
        ember.src = "4s.png";

    else if (bebetuk.length - talalatchar == 4)
        ember.src = "5s.png";

    else if (bebetuk.length - talalatchar == 5)
        ember.src = "6s.png";

    else if (bebetuk.length - talalatchar == 6)
        ember.src = "7s.png";

    else ember.src = "8s.png";

    if (win() || lose()) {
        gombcont.style.opacity = 1;
        for (var i = 0; i < abc2.length; i++) {
            gomb.setAttribute('onclick', 'szav()');
            abc2[i].setAttribute('onclick', '');
            abc2[i].style.pointerEvents = "none";
        }
    }
}
function lathato() {
    var talalt = 0;
    var talaltkarakter = 0
    for (var i = 0; i < bebetuk.length; i++) {
        var duplabetu = 0;
        for (var j = 0; j < adottszo.length; j++)
            if (bebetuk[i] == adottszo[j].innerHTML) {
                adottszo[j].style.opacity = 1;
                duplabetu++;
                talalt++;
                if (duplabetu == 1)
                    talaltkarakter++;
            }
    }
    if (talalt > talalat) talalat = talalt;
    talalatchar = talaltkarakter;
}
function win() {
    if (talalat == adottszo.length) {
        document.querySelector(".nyert").innerHTML = "Nyertél!";
        return true;
    }
    return false;
}
function lose() {
    if (bebetuk.length - talalat == 7) {
        document.querySelector(".nyert").innerHTML = "Vesztettél!";
        return true;
    }
    return false;
}
/* 1.: Ha nyert/veszített --> ne tudjun betűre kattintani - DONE
    2.: Ember bábu DONE
    3.: Mobil változat IN PROGRESS
    4.: győztes hírdetés - DONE
*/