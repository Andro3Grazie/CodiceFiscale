var cf = "";
function getCognome() {
    var cognome = document.getElementsByName("cognome")[0].value;
    cognome = rimuoviSpazio(cognome);
    consonanti(cognome, "m");
}
function getNome() {
    var nome = document.getElementsByName("nome")[0].value;
    nome = rimuoviSpazio(nome);
    consonanti(nome, "n");
}
function getAnno() {
    var anno = document.getElementsByName("adate")[0].value;
    cf += anno[2] + anno[3];
}
function getMese() {
    var mese = document.getElementsByName("mdate")[0].value;
    switch (mese) {
        case '01':
            cf += "a";
            break;
        case '02':
            cf += "b";
            break;
        case '03':
            cf += "c";
            break;
        case '04':
            cf += "d";
            break;
        case '05':
            cf += "e";
            break;
        case '06':
            cf += "h";
            break;
        case '07':
            cf += "l";
            break;
        case '08':
            cf += "m";
            break;
        case '09':
            cf += "p";
            break;
        case '10':
            cf += "r";
            break;
        case '11':
            cf += "s";
            break;
        case '12':
            cf += "t";
            break;
    }
}
function getGiorno(params) {
    var giorno = document.getElementsByName("gdate")[0].value;
    if (getSesso() == 'f')
        giorno = parseInt(giorno) + 40;
    cf += giorno;
}
function getSesso() {
    return document.getElementsByName("sesso")[0].value;
}
function getComune() {

}
function getInfo() {
    cf = "";
    getCognome();
    getNome();
    getAnno();
    getMese();
    getGiorno();
    getComune();

    printCF();
}
function printCF() {
    var x = window.matchMedia("(max-width: 700px)")
    if (x.matches) {
        document.getElementById("popup-content").innerHTML = cf.toUpperCase();
    } else {
        document.getElementById("popup-content").innerHTML = cf.toUpperCase();
        console.log(cf.toUpperCase());
    }
}
function getCodiceCastale() {
    var luogo = document.getElementsByName("luogo")[0].value;
    var json = $.getJSON("data/comuni.json");

}
function rimuoviSpazio(string) {
    return string.split(' ').join('');
}
function consonanti(string, bool) {
    var lista_vocali = 'aeiouAEIOU';
    var cons = 0;
    var c = "";

    //Conta le consonanti
    for (var i = 0; i < string.length; i++) {
        if (lista_vocali.indexOf(string[i]) === -1) {
            c += string[i]; //Metti tutte le consonani dentro c 
            cons++;//Incrementa numero consonanti
        }
    }
    //Se e' il nome ed ha piu' di 3 consonanti
    if (bool == "n" && cons > 3) {
        cf += c[0] + c[2] + c[3];
    } else { //Altrimenti
        if (string.length == 3) { //Ha 3 lettere
            cf += string;
        } else if (string.length < 3) { //Meno di 3 lettere
            c = string.length;
            cf += string;
            while (c < 3) {
                cf += "x";
                c++;
            }
        } if (string.length > 3) { //Piu' di 3 lettere e non e' il nome
            if (cons >= 3) {
                for (var i = 0; i < 3; i++) {
                    cf += c[i];
                }
            } else {
                //Inserisci le consonanti
                cf += c;
                for (var i = 0; i < string.length; i++) {
                    //Alle consonanti aggiungi le vocali
                    if (lista_vocali.indexOf(string[i]) !== -1) {
                        cf += string[i];
                        cons++;
                        if (cons >= 3) {
                            break;
                        }
                    }
                }
            }
        }
    }
}