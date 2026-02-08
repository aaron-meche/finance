import { json } from '@sveltejs/kit';
import { plaidClient } from '$lib/plaid';

export async function POST({ request }) {
    const { accessToken } = await request.json();

    if (!accessToken) {
        return json({ error: 'Missing access token' }, { status: 400 });
    }

    try {
        const response = await plaidClient.accountsGet({
            access_token: accessToken
        });

        return json({
            accounts: response.data.accounts,
            item_id: response.data.item_id
        });
    } catch (error) {
        console.error(error);
        const errData = error.response?.data || {};
        return json(
            {
                error: 'Plaid request failed',
                message: errData.error_message || error.message,
                code: errData.error_code
            },
            { status: 500 }
        );
    }
}