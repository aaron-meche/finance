
import { db } from '$lib/data'

let accounts, transactions

function interpretTransactions(transactions) {
    transactions.forEach(t => {
        t.type = "Undefined"
        let a = accounts.find(item => item.account_id === t.account_id)
        let cat = t.personal_finance_category.primary
        // if (cat !== "TRANSFER_OUT" && !t.name.toLowerCase().includes("credit")) {
        //     t.type = "Charge"
        //     t.amount *= -1
        // } else {
        //     t.type = "Payment / Credit"
        // }
    })
    
    return transactions
}

// Plaid Custom Functions
// 
// Update APIs: Call API and update database
export function updateAPIs(accessToken) {
    console.log("Updating api...")
    loadAccounts(accessToken)
    fetchTransactions(accessToken)
}

async function loadAccounts(accessToken) {
    try {
        const res = await fetch("/api/accounts", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken: accessToken })
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || data.error || "Failed");
        }

        db.update(store => {
            accounts = data.accounts || []
            store.accounts = accounts
            return store
        })
    } catch (err) {
        console.error(err)
    }
}

async function fetchTransactions(accessToken) {
    try {
        const res = await fetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: accessToken,
                // startDate: '2025-01-01',
                // endDate:   '2026-02-04',
            })
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch transactions');
        }

        if (data.transactions.length > 0) {
            db.update(store => {
                transactions = interpretTransactions(data.transactions)
                store.transactions = transactions || []
                return store
            })
        }
    } catch (err) {
        console.error(err);
    }
}