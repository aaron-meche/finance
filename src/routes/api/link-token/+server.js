import { plaidClient } from '$lib/plaid';
import { json } from '@sveltejs/kit';

export async function POST() {
    try {
        const response = await plaidClient.linkTokenCreate({
            user: { client_user_id: `user-${Date.now()}` },
            client_name: 'finance',
            products: ['transactions'],
            language: 'en',
            country_codes: ['US'],
        });

        return json({ link_token: response.data.link_token });
    } catch (err) {
        console.error(err);
        return json({ error: err.message || 'Failed to create link token' }, { status: 500 });
    }
}