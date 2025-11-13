export class AmiiboApi {
    apiUrl = 'http://localhost:4000';

    async getAmiibos(filters = {}) {
        const token = localStorage.getItem('token');
        if (!token) {
            return { error: 'Nenhum token encontrado. Faça o login novamente.' };
        }

        const queryParams = new URLSearchParams(filters).toString();
        const url = `${this.apiUrl}/api/amiibos${queryParams ? `?${queryParams}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return await response.json();
    }

    async createAmiibo(amiiboData) {
        const token = localStorage.getItem('token');
        if (!token) {
            return { error: 'Nenhum token encontrado. Faça o login novamente.' };
        }

        const response = await fetch(`${this.apiUrl}/api/amiibos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(amiiboData)
        });

        return await response.json();
    }

    async getGames(filters = {}) {
        const token = localStorage.getItem('token');
        if (!token) {
            return { error: 'Nenhum token encontrado. Faça o login novamente.' };
        }

        const queryParams = new URLSearchParams(filters).toString();
        const url = `${this.apiUrl}/api/games${queryParams ? `?${queryParams}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return await response.json();
    }

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