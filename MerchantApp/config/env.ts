import { DEV_API, PROD_API,  PROD_CONNECT_API, DEV_CONNECT_API, TOKEN_TTL } from '@env';

const devEnvironmentVariables = {
    API_URL: DEV_API,
    CONNECT_URL: DEV_CONNECT_API,
    TOKEN_TTL
} 

const prodEnvironmentVariables = {
    API_URL: PROD_API,
    CONNECT_URL: PROD_CONNECT_API,
    TOKEN_TTL
}

export default __DEV__ ? devEnvironmentVariables : devEnvironmentVariables;