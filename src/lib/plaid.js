// $lib/plaid.js
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { env } from '$env/dynamic/private';
import { db } from '$lib/data'

export const plaidClient = new PlaidApi({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': env.PLAID_CLIENT_ID,
            'PLAID-SECRET': env.PLAID_SECRET,
            // 'PLAID-SECRET': env.PLAID_REAL,
        },
    },
});