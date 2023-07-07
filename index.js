const { XMLHttpRequest } = require('xhr2');

function fetchFestivalData() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = 'https://data.culture.gouv.fr/api/records/1.0/search/?dataset=panorama-des-festivals';

        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error('Request failed with status ' + xhr.status));
                }
            }
        };
        xhr.send();
    });
}

async function getCitiesWithFestivals() {
    try {
        const festivalData = await fetchFestivalData();
        const citiesWithFestivals = {};

        festivalData.records.forEach((record) => {
            const city = record.fields.commune_principale;

            // eslint-disable-next-line no-prototype-builtins
            if (!citiesWithFestivals.hasOwnProperty(city)) {
                citiesWithFestivals[city] = [];
            }

            const festivalName = record.fields.nom_de_la_manifestation;
            citiesWithFestivals[city].push(festivalName);
            const festivalType = record.fields.domaine;
            citiesWithFestivals[city].push(festivalType);
            const festivalDate = record.fields.mois_habituel_de_debut;
            citiesWithFestivals[city].push(festivalDate);
        });

        return citiesWithFestivals;
    } catch (error) {
        throw new Error('Failed to fetch festival data: ' + error.message);
    }
}

module.exports = {
    getCitiesWithFestivals
};
