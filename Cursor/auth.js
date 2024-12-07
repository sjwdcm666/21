function generateToken(apiKey) {
    try {
        const [id, secret] = apiKey.split('.');
        
        const header = {
            alg: 'HS256',
            sign_type: 'SIGN'
        };

        const payload = {
            api_key: id,
            exp: Date.now() + 3600 * 1000, // 1小时后过期
            timestamp: Date.now()
        };

        return jwt_encode(payload, secret, header);
    } catch (error) {
        console.error('生成Token失败:', error);
        throw new Error('Invalid API Key');
    }
}

window.auth = {
    getAuthHeader() {
        const token = generateToken(window.config.API_KEY);
        return `Bearer ${token}`;
    }
}; 