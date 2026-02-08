// @ts-nocheck
import { plaidClient } from '$lib/plaid';
import { json } from '@sveltejs/kit';
import { db } from '$lib/data'

export async function POST({ request }) {
    try {
        const { public_token } = await request.json();
        const response = await plaidClient.itemPublicTokenExchange({ public_token });
        console.log("response recieved")
        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;
        
        return json({ access_token: accessToken, item_id: itemId });
    } catch (error) {
        console.error(error);
        return json({ error: error.message }, { status: 500 });
    }
}