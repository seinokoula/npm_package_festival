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

function getFestivalData() {
    return fetchFestivalData()
        .then((festivalData) => {
            return festivalData;
        })
        .catch((error) => {
            console.error('Error:', error)
        });
}

module.exports = {
    getFestivalData
};
