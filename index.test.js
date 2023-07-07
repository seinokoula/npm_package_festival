const { getCitiesWithFestivals } = require('./index');

test('Afficher les villes et les festivals associés', async () => {
    const citiesWithFestivals = await getCitiesWithFestivals();

    const cityNames = Object.keys(citiesWithFestivals);

    expect(cityNames.length).toBeGreaterThan(0);
});
