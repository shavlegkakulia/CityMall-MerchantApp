const devEnvironmentVariables = {
    API_URL: 'https://citymallapi.payunicard.ge:8061',
    CONNECT_URL: 'https://citymallidentity.payunicard.ge:8060',
    TOKEN_TTL: ''
} 

const prodEnvironmentVariables = {
    API_URL: 'https://citymallapi.payunicard.ge:8061',
    CONNECT_URL: 'https://citymallidentity.payunicard.ge:8060',
    TOKEN_TTL: ''
}

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;