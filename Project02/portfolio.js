document.addEventListener('DOMContentLoaded', function() {
    const portfolioChartContainer = document.getElementById('portfolioChart');
    const assetList = document.getElementById('assetList');
    const coinView = document.getElementById('coinView');
    const portfolioView = document.getElementById('portfolioView');
    const backToPortfolioBtn = document.getElementById('backToPortfolio');
    const alertButton = document.getElementById('alertButton');
    const chartTypeToggle = document.getElementById('chartTypeToggle');
    const coinChartContainer = document.getElementById('coinChartContainer');
    const alertModal = document.getElementById('alertModal');
    const closeAlertModal = document.getElementById('closeAlertModal');
    const setAlertForm = document.getElementById('setAlertForm');

    // Sample data
    const portfolioData = {
        totalBalance: 10000,
        change24h: 5.2,
        assets: [
            { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, value: 5000, change24h: 2.5 },
            { symbol: 'ETH', name: 'Ethereum', amount: 2, value: 3000, change24h: -1.2 },
            { symbol: 'ADA', name: 'Cardano', amount: 1000, value: 2000, change24h: 5.7 },
            { symbol: 'XRP', name: 'Ripple', amount: 5000, value: 1000, change24h: 1.8 },
            { symbol: 'DOT', name: 'Polkadot', amount: 100, value: 800, change24h: -0.5 },
            { symbol: 'DOGE', name: 'Dogecoin', amount: 10000, value: 700, change24h: 3.2 }
        ]
    };

    let currentCoin = null;
    let currentChartType = 'line';
    let currentChart = null;

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

    function createPortfolioChart() {
        const chart = LightweightCharts.createChart(portfolioChartContainer, {
            width: portfolioChartContainer.offsetWidth,
            height: 300,
            layout: {
                backgroundColor: '#1E222D',
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { color: '#2B2B43' },
                horzLines: { color: '#2B2B43' },
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: '#2B2B43',
            },
            timeScale: {
                borderColor: '#2B2B43',
            },
        });

        const lineSeries = chart.addLineSeries({ color: '#2962FF' });
        lineSeries.setData(generateDummyData(30, portfolioData.totalBalance));

        window.addEventListener('resize', () => {
            chart.applyOptions({ width: portfolioChartContainer.offsetWidth });
        });
    }

    function populateAssetList(assets) {
        assetList.innerHTML = '';
        assets.forEach((asset) => {
            const listItem = document.createElement('li');
            listItem.className = 'asset-item';
            listItem.innerHTML = `
                <div class="asset-icon">${getIcon(asset.symbol)}</div>
                <div class="asset-details">
                    <div class="asset-name">${asset.name}</div>
                    <div class="asset-amount">${asset.amount} ${asset.symbol}</div>
                </div>
                <div class="asset-chart" id="chart-${asset.symbol}"></div>
                <div class="asset-value">
                    <div class="asset-price">$${asset.value.toFixed(2)}</div>
                    <div class="asset-change ${asset.change24h >= 0 ? 'positive-change' : 'negative-change'}">
                        ${asset.change24h >= 0 ? '+' : ''}${asset.change24h.toFixed(2)}%
                    </div>
                </div>
            `;
            listItem.addEventListener('click', () => showCoinOverview(asset));
            assetList.appendChild(listItem);
            createMiniChart(asset, document.getElementById(`chart-${asset.symbol}`));
        });
    }

    function createMiniChart(coin, container) {
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
            color: coin.change24h >= 0 ? '#26a69a' : '#ef5350',
            lineWidth: 2,
        });

        lineSeries.setData(generateDummyData(7, coin.value));
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

    function showCoinOverview(coin) {
        currentCoin = coin;
        portfolioView.style.display = 'none';
        coinView.style.display = 'block';
        document.getElementById('coinIcon').innerHTML = getIcon(coin.symbol);
        document.getElementById('coinName').textContent = coin.name;
        document.getElementById('coinValue').textContent = `$${coin.value.toFixed(2)}`;
        const changeElement = document.getElementById('coinChange');
        changeElement.textContent = `${coin.change24h >= 0 ? '+' : ''}${coin.change24h.toFixed(2)}%`;
        changeElement.className = `coin-change ${coin.change24h >= 0 ? 'positive-change' : 'negative-change'}`;
        createCoinChart(coin.symbol);
    }

    function createCoinChart(symbol) {
        coinChartContainer.innerHTML = '';
        const chart = LightweightCharts.createChart(coinChartContainer, {
            width: coinChartContainer.offsetWidth,
            height: 400,
            layout: {
                backgroundColor: '#1E222D',
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { color: '#2B2B43' },
                horzLines: { color: '#2B2B43' },
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: '#2B2B43',
            },
            timeScale: {
                borderColor: '#2B2B43',
            },
        });

        const series = currentChartType === 'line'
            ? chart.addLineSeries({ color: '#2962FF' })
            : chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350'
            });

        series.setData(generateDummyChartData(symbol, 30, currentChartType));

        currentChart = { chart, series };

        window.addEventListener('resize', () => {
            chart.applyOptions({ width: coinChartContainer.offsetWidth });
        });
    }

    function generateDummyChartData(symbol, days, type) {
        const data = [];
        const now = new Date();
        let price = portfolioData.assets.find(asset => asset.symbol === symbol).value;
        for (let i = days; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            if (type === 'line') {
                price *= (1 + (Math.random() - 0.5) * 0.05);
                data.push({ time: date.toISOString().split('T')[0], value: price });
            } else {
                const open = price * (1 + (Math.random() - 0.5) * 0.05);
                const high = open * (1 + Math.random() * 0.03);
                const low = open * (1 - Math.random() * 0.03);
                const close = low + Math.random() * (high - low);
                data.push({
                    time: date.toISOString().split('T')[0],
                    open: open,
                    high: high,
                    low: low,
                    close: close,
                });
                price = close;
            }
        }
        return data;
    }

    function updatePortfolioOverview(data) {
        document.querySelector('.balance-amount').textContent = `$${data.totalBalance.toFixed(2)}`;
        const changeElement = document.querySelector('.balance-change');
        changeElement.textContent = `${data.change24h >= 0 ? '+' : ''}${data.change24h.toFixed(2)}%`;
        changeElement.className = `balance-change ${data.change24h >= 0 ? 'positive-change' : 'negative-change'}`;
    }

    backToPortfolioBtn.addEventListener('click', () => {
        coinView.style.display = 'none';
        portfolioView.style.display = 'block';
    });

    alertButton.addEventListener('click', () => {
        if (currentCoin) {
            document.getElementById('alertCoinName').textContent = currentCoin.name;
            document.getElementById('alertCurrentPrice').textContent = `$${currentCoin.value.toFixed(2)}`;
            alertModal.style.display = 'block';
        } else {
            alert('Please select a coin first.');
        }
    });

    chartTypeToggle.addEventListener('click', () => {
        currentChartType = currentChartType === 'line' ? 'candlestick' : 'line';
        const icon = chartTypeToggle.querySelector('i');
        icon.className = currentChartType === 'line' ? 'fas fa-chart-line' : 'fas fa-chart-bar';
        createCoinChart(currentCoin.symbol);
    });

    // Add this function to handle setting up the alert
    function setupAlertButton() {
        alertButton.addEventListener('click', () => {
            if (currentCoin) {
                document.getElementById('alertCoinName').textContent = currentCoin.name;
                document.getElementById('alertCurrentPrice').textContent = `$${currentCoin.value.toFixed(2)}`;
                alertModal.style.display = 'block';
            } else {
                alert('Please select a coin first.');
            }
        });

        closeAlertModal.addEventListener('click', () => {
            alertModal.style.display = 'none';
        });

        setAlertForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const alertPrice = document.getElementById('alertPrice').value;
            const alertDirection = document.getElementById('alertDirection').value;
            
            // Here you would typically send this data to your backend or store it locally
            console.log(`Alert set for ${currentCoin.name} when price ${alertDirection} $${alertPrice}`);
            
            // For demonstration, we'll just show an alert
            alert(`Alert set for ${currentCoin.name} when price ${alertDirection} $${alertPrice}`);
            
            alertModal.style.display = 'none';
        });
    }

    // Call this function to set up the alert button functionality
    setupAlertButton();

    // Initialize the portfolio view
    updatePortfolioOverview(portfolioData);
    createPortfolioChart();
    populateAssetList(portfolioData.assets);
});
