import { json } from '@sveltejs/kit';
import { plaidClient } from '$lib/plaid';

export async function POST({ request }) {
    const body = await request.json();
    const { accessToken, startDate, endDate, accountIds } = body;

    if (!accessToken) {
        return json({ error: 'Missing access token' }, { status: 400 });
    }

    // Plaid requires start_date and end_date in YYYY-MM-DD format
    // Provide defaults if not sent (e.g. last 30–90 days)
    const today = new Date();
    const defaultStart = new Date();
    defaultStart.setDate(today.getDate() - 90); // last 90 days is common/safe

    const finalStartDate = startDate || defaultStart.toISOString().split('T')[0];
    const finalEndDate   = endDate   || today.toISOString().split('T')[0];

    try {
        const response = await plaidClient.transactionsGet({
            access_token: accessToken,
            start_date: finalStartDate,
            end_date: finalEndDate,
            // Optional: filter to specific account(s) — useful when showing details for one account
            options: accountIds ? { account_ids: accountIds } : undefined
            // You can add more options here if needed, e.g.:
            // count: 100,
            // offset: 0
        });

        return json({
            transactions: response.data.transactions,
            total_transactions: response.data.total_transactions,
            // Optional: include request dates for frontend reference
            request_dates: {
                start_date: finalStartDate,
                end_date: finalEndDate
            }
        });
    } catch (error) {
        console.error('Plaid transactions error:', error);
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