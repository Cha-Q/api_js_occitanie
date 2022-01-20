let zone = document.querySelector("#zone");
let valider = document.querySelector("#button");
let commune = document.querySelector("#commune");

const urlfull = "https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&facet=type&facet=thematique&facet=date_debut&facet=commune";

async function happy(urlfull) {
    let response = await fetch(urlfull);
    let data = await response.json();

    select(data);
}

function select(data) {
    let ville = data.facet_groups[3].facets;
    for (let k in ville) {
        let ciudad = document.createElement("option");

        ciudad.textContent = ville[k].name;

        commune.appendChild(ciudad);
    }
}
happy(urlfull);



const url = "https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&facet=type&facet=thematique&facet=date_debut&facet=commune&refine.commune=";


valider.addEventListener("click", function() {
    let id = commune.value;
    let newUrl = `${url}${id}`;
    zone.innerHTML = " ";
    async function requestApi() {
        let response = await fetch(newUrl);
        let json = await response.json();

        ideeMB(json);
    }

    function ideeMB(json) {
        let bonjour = json.records;

        for (let i in bonjour) {
            let newZone = document.createElement("div");

            let event = document.createElement("p");
            let date = document.createElement("p");
            let titre = document.createElement("h3");
            let description = document.createElement("p");
            let adresse = document.createElement("p");
            let internet = document.createElement("iframe");


            let eventUrl = bonjour[i].fields.url;
            internet.setAttribute("src", eventUrl);
            titre.textContent = bonjour[i].fields.titre;
            event.textContent = bonjour[i].fields.thematique;
            date.textContent = bonjour[i].fields.date;
            description.textContent = bonjour[i].fields.description;
            adresse.textContent = bonjour[i].fields.adresse;


            zone.appendChild(newZone);
            newZone.appendChild(titre);
            newZone.appendChild(date);
            newZone.appendChild(adresse);
            newZone.appendChild(event);
            newZone.appendChild(description);
            newZone.appendChild(internet);

        }


    }

    requestApi(url);
});