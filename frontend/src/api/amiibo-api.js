export class AmiiboApi {
    #parseAmiiboDates(amiibo) {
        if (!amiibo || amiibo.error) return amiibo;
        return {
            ...amiibo,
            releaseDateJapan: amiibo.releaseDateJapan ? new Date(amiibo.releaseDateJapan) : null,
            releaseDateBrazil: amiibo.releaseDateBrazil ? new Date(amiibo.releaseDateBrazil) : null,
        };
    }

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

        const data = await response.json();
        if (Array.isArray(data)) {
            return data.map(this.#parseAmiiboDates);
        }

        return data; // Retorna o objeto de erro se não for um array
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

        const newAmiibo = await response.json();
        return this.#parseAmiiboDates(newAmiibo);
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

    async logout() {
        const token = localStorage.getItem('token');
        if (!token) {
            return { message: 'Nenhum usuário logado.' };
        }

        localStorage.removeItem('token');

        const response = await fetch(`${this.apiUrl}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return await response.json();
    }
}