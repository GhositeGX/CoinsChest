const watchlistItems = [
    { name: 'Bitcoin', symbol: 'BTC', price: 50000, change: 2.5 },
    { name: 'Ethereum', symbol: 'ETH', price: 3000, change: -1.2 },
    { name: 'Solana', symbol: 'SOL', price: 100, change: 5.7 },
    { name: 'Cardano', symbol: 'ADA', price: 1.5, change: 0.8 },
    { name: 'Polkadot', symbol: 'DOT', price: 30, change: -0.5 },
];

function updateWatchlist() {
    const watchlistContainer = document.getElementById('watchlistItems');
    watchlistContainer.innerHTML = '';

    watchlistItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'watchlist-item';
        div.innerHTML = `
            <span class="crypto-name">${item.name} (${item.symbol})</span>
            <div>
                <span class="crypto-price">${formatCurrency(item.price)}</span>
                <span class="crypto-change ${item.change >= 0 ? 'positive-change' : 'negative-change'}">
                    ${item.change >= 0 ? '+' : ''}${item.change.toFixed(2)}%
                </span>
            </div>
        `;
        watchlistContainer.appendChild(div);
    });
}

function createBalanceChart() {
    const ctx = document.getElementById('balanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Balance',
                data: [9000, 9500, 10000, 9800, 10200, 10000],
                borderColor: '#2ecc71', // Emerald green
                backgroundColor: 'rgba(46, 204, 113, 0.1)', // Transparent emerald green
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

updateWatchlist();
createBalanceChart();

setInterval(() => {
    watchlistItems.forEach(item => {
        item.price *= (1 + (Math.random() - 0.5) * 0.02);
        item.change = (Math.random() - 0.5) * 10;
    });
    updateWatchlist();
}, 5000);

document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = watchlistItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.symbol.toLowerCase().includes(searchTerm)
    );
    updateWatchlist(filteredItems);
});

// Update the existing code at the end of the file

document.addEventListener('DOMContentLoaded', function() {
    const balanceChartContainer = document.getElementById('balanceChart');
    const miniBalanceChartContainer = document.getElementById('miniBalanceChart');
    const searchInput = document.getElementById('searchInput');
    const addToWatchlistBtn = document.getElementById('addToWatchlist');
    const watchlist = document.getElementById('watchlist');
    const searchResults = document.createElement('div');
    searchResults.id = 'searchResults';
    searchResults.className = 'search-results';
    document.querySelector('.search-bar').appendChild(searchResults);

    // Sample data
    const balanceHistory = [
        { time: '2023-05-01', value: 9500 },
        { time: '2023-05-02', value: 9800 },
        { time: '2023-05-03', value: 9600 },
        { time: '2023-05-04', value: 9900 },
        { time: '2023-05-05', value: 10000 }
    ];

    let watchlistData = [
        { symbol: 'BTC', name: 'Bitcoin', price: 29000, change: 2.5 },
        { symbol: 'ETH', name: 'Ethereum', price: 1800, change: -1.2 },
        { symbol: 'ADA', name: 'Cardano', price: 0.35, change: 5.7 }
    ];

    const allCoins = [
        { symbol: 'BTC', name: 'Bitcoin', price: 29000, change: 2.5 },
        { symbol: 'ETH', name: 'Ethereum', price: 1800, change: -1.2 },
        { symbol: 'ADA', name: 'Cardano', price: 0.35, change: 5.7 },
        { symbol: 'XRP', name: 'Ripple', price: 0.6, change: 1.8 },
        { symbol: 'DOT', name: 'Polkadot', price: 6.2, change: -0.5 },
        { symbol: 'DOGE', name: 'Dogecoin', price: 0.08, change: 3.2 }
    ];

    function createBalanceChart() {
        const chart = LightweightCharts.createChart(balanceChartContainer, {
            width: 150,
            height: 70,
            layout: {
                background: { type: 'solid', color: 'transparent' },
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
            rightPriceScale: { visible: false },
            timeScale: { visible: false },
            crosshair: { visible: false },
        });

        const lineSeries = chart.addLineSeries({
            color: '#2962FF',
            lineWidth: 2,
        });

        lineSeries.setData(balanceHistory);
    }

    function createMiniBalanceChart() {
        const chart = LightweightCharts.createChart(miniBalanceChartContainer, {
            width: 60,
            height: 30,
            layout: {
                background: { type: 'solid', color: 'transparent' },
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
            rightPriceScale: { visible: false },
            timeScale: { visible: false },
            crosshair: { visible: false },
        });

        const lineSeries = chart.addLineSeries({
            color: '#2ecc71',
            lineWidth: 1,
        });

        lineSeries.setData(balanceHistory);
    }

    function createWatchlistItemChart(container, data) {
        const chart = LightweightCharts.createChart(container, {
            width: 100,
            height: 40,
            layout: {
                background: { type: 'solid', color: 'transparent' },
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
            rightPriceScale: { visible: false },
            timeScale: { visible: false },
            crosshair: { visible: false },
        });

        const lineSeries = chart.addLineSeries({
            color: data.change >= 0 ? '#26a69a' : '#ef5350',
            lineWidth: 2,
        });

        lineSeries.setData(generateDummyData(7, data.price));
    }

    function generateDummyData(days, currentPrice) {
        const data = [];
        const now = new Date();
        for (let i = days; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const price = currentPrice * (1 + (Math.random() - 0.5) * 0.1);
            data.push({ time: date.toISOString().split('T')[0], value: price });
        }
        return data;
    }

    function populateWatchlist() {
        watchlist.innerHTML = '';
        watchlistData.forEach(coin => {
            const li = document.createElement('li');
            li.className = 'watchlist-item';
            li.innerHTML = `
                <div class="watchlist-item-icon">${getIcon(coin.symbol)}</div>
                <div class="watchlist-item-info">
                    <div class="watchlist-item-name">${coin.name}</div>
                    <div class="watchlist-item-symbol">${coin.symbol}</div>
                </div>
                <div class="watchlist-item-chart" id="chart-${coin.symbol}"></div>
                <div class="watchlist-item-price">
                    <div>$${coin.price.toFixed(2)}</div>
                    <div class="watchlist-item-change ${coin.change >= 0 ? 'positive-change' : 'negative-change'}">
                        ${coin.change >= 0 ? '+' : ''}${coin.change.toFixed(2)}%
                    </div>
                </div>
                <button class="remove-from-watchlist" data-symbol="${coin.symbol}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            watchlist.appendChild(li);
            createWatchlistItemChart(document.getElementById(`chart-${coin.symbol}`), coin);
        });

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-from-watchlist').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromWatchlist(e.target.closest('button').dataset.symbol);
            });
        });
    }

    function getIcon(symbol) {
        const colors = {
            BTC: '#F7931A',
            ETH: '#627EEA',
            ADA: '#0D1E30',
            XRP: '#23292F',
            DOT: '#E6007A',
            DOGE: '#C2A633'
        };

        const backgroundColor = colors[symbol] || '#000000';
        
        return `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="${backgroundColor}"/>
            <text x="10" y="14" font-family="Arial, sans-serif" font-size="8" fill="white" text-anchor="middle">${symbol}</text>
        </svg>`;
    }

    function searchCoins() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length === 0) {
            searchResults.innerHTML = '';
            return;
        }

        const filteredCoins = allCoins.filter(coin => 
            (coin.name.toLowerCase().includes(searchTerm) || 
            coin.symbol.toLowerCase().includes(searchTerm)) &&
            !watchlistData.some(watchlistCoin => watchlistCoin.symbol === coin.symbol)
        );

        searchResults.innerHTML = '';
        filteredCoins.forEach(coin => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = `
                <span>${coin.name} (${coin.symbol})</span>
                <button class="add-to-watchlist" data-symbol="${coin.symbol}">Add</button>
            `;
            searchResults.appendChild(div);
        });

        // Add event listeners for add buttons
        document.querySelectorAll('.add-to-watchlist').forEach(button => {
            button.addEventListener('click', (e) => {
                addToWatchlist(e.target.dataset.symbol);
            });
        });
    }

    function addToWatchlist(symbol) {
        const coinToAdd = allCoins.find(coin => coin.symbol === symbol);
        if (coinToAdd && !watchlistData.some(coin => coin.symbol === symbol)) {
            watchlistData.push(coinToAdd);
            populateWatchlist();
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    }

    function removeFromWatchlist(symbol) {
        watchlistData = watchlistData.filter(coin => coin.symbol !== symbol);
        populateWatchlist();
    }

    createBalanceChart();
    createMiniBalanceChart();
    populateWatchlist();

    searchInput.addEventListener('input', searchCoins);
    addToWatchlistBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            const coinToAdd = allCoins.find(coin => 
                coin.symbol.toLowerCase() === searchTerm.toLowerCase() || 
                coin.name.toLowerCase() === searchTerm.toLowerCase()
            );
            if (coinToAdd) {
                addToWatchlist(coinToAdd.symbol);
            }
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            searchResults.innerHTML = '';
        }
    });
});
