export class AmiiboApi {
    apiUrl = 'http://localhost:4000';

    // async getAmiibos() {
    //     let amiibos = await fetch(this.apiUrl);
    //     let amiiboJson = await amiibos.json();
    //     return amiiboJson.amiibo;
    // }

    // async searchAmiibos(name) {
    //     let amiibos = await fetch(`${this.apiUrl}?name=${name}`);
    //     let amiiboJson = await amiibos.json();
    //     return amiiboJson.amiibo;
    // }

    async login(username, password){
        const response = await fetch(`${this.apiUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        return await response.json();
    }

    async registerUser(username, password){
        let response = await fetch(`${this.apiUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        return await response.json();
    }
}