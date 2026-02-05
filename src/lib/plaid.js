// $lib/plaid.js
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { env } from '$env/dynamic/private';

export const plaidClient = new PlaidApi({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': env.PLAID_CLIENT_ID,
            'PLAID-SECRET': env.PLAID_SECRET,
        },
    },
});