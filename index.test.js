const { getFestivalData } = require('./index'); 

test('Obtenir les données des festivals', async () => {
    const festivalData = await getFestivalData();

    expect(festivalData).toBeDefined();
    expect(Array.isArray(festivalData.records)).toBe(true);
    expect(festivalData.records.length).toBeGreaterThan(0);
});
