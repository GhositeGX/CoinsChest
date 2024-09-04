document.addEventListener('DOMContentLoaded', function() {
    // Check if we're coming from the Buy button
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action === 'buy') {
        document.getElementById('tradeType').value = 'buy';
    }
});

const cryptocurrencies = [
    { name: 'Bitcoin', symbol: 'BTC', price: 50000 },
    { name: 'Ethereum', symbol: 'ETH', price: 3000 },
    { name: 'Solana', symbol: 'SOL', price: 100 },
    { name: 'Cardano', symbol: 'ADA', price: 1.5 },
    { name: 'Polkadot', symbol: 'DOT', price: 30 },
];

function populateCryptoSelect() {
    const cryptoSelect = document.getElementById('cryptoSelect');
    cryptocurrencies.forEach(crypto => {
        const option = document.createElement('option');
        option.value = crypto.symbol;
        option.textContent = `${crypto.name} (${crypto.symbol})`;
        cryptoSelect.appendChild(option);
    });
}

function executeTrade(event) {
    event.preventDefault();
    const tradeType = document.getElementById('tradeType').value;
    const cryptoSymbol = document.getElementById('cryptoSelect').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const crypto = cryptocurrencies.find(c => c.symbol === cryptoSymbol);
    if (crypto && amount > 0) {
        const total = amount * crypto.price;
        alert(`${tradeType.toUpperCase()} order executed: ${amount} ${crypto.symbol} for ${formatCurrency(total)}`);
        // If you're using a custom alert, you can style it with the emerald green color
    } else {
        alert('Invalid trade parameters. Please check your inputs.');
    }
}

populateCryptoSelect();
document.getElementById('tradeForm').addEventListener('submit', executeTrade);

document.addEventListener('DOMContentLoaded', () => {
    const tradeForm = document.getElementById('tradeForm');
    const tradeTypeToggle = document.querySelector('.trade-type-toggle');
    const tradeButton = document.querySelector('.trade-button');
    const transactionList = document.getElementById('transactionList');

    let currentTradeType = 'buy';

    tradeTypeToggle.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.trade-type-toggle button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentTradeType = e.target.dataset.tradeType;
            tradeButton.textContent = currentTradeType === 'buy' ? 'Buy Now' : 'Sell Now';
        }
    });

    tradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const crypto = document.getElementById('cryptoSelect').value;
        const amount = document.getElementById('tradeAmount').value;

        // Here you would typically send this data to your backend
        console.log(`${currentTradeType.toUpperCase()} ${amount} ${crypto}`);

        // For demonstration, we'll add a new transaction to the list
        addTransaction(crypto, amount, currentTradeType);

        // Reset form
        tradeForm.reset();
    });

    function addTransaction(crypto, amount, type) {
        const li = document.createElement('li');
        li.className = 'transaction-item';
        li.innerHTML = `
            <div class="transaction-details">
                <span class="transaction-coin">${crypto.toUpperCase()}</span>
                <span class="transaction-date">${new Date().toLocaleString()}</span>
            </div>
            <span class="transaction-amount transaction-${type}">${type === 'buy' ? '+' : '-'}${amount} ${crypto.toUpperCase()}</span>
        `;
        transactionList.prepend(li);
    }
});
