// $lib/plaid.js
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { PLAID_CLIENT_ID, PLAID_SECRET } from "$env/static/private";

export const plaidClient = new PlaidApi({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
        'PLAID-SECRET': PLAID_SECRET,
        },
    },
});