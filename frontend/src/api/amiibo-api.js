export class AmiiboApi {
    apiUrl = 'https://www.amiiboapi.com/api/amiibo/';

    async getAmiibos() {
        let amiibos = await fetch(this.apiUrl);
        let amiiboJson = await amiibos.json();
        return amiiboJson.amiibo;
    }

    async searchAmiibos(name) {
        let amiibos = await fetch(`${this.apiUrl}?name=${name}`);
        let amiiboJson = await amiibos.json();
        return amiiboJson.amiibo;
    }
}