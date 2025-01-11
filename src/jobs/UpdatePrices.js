const axios = require('axios');
const cron  = require('node-cron');
const CryptoPrice = require('../models/CryptoPrice');
const SUPPORTED_COINS = ['bitcoin', 'matic-network', 'ethereum'];
async function fetchCoinData(coinId){
    // console.log(`Fetching data for ${coinId}.....`);
    try{
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price',{
            params: {
                ids: coinId,
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change : true,
            }
        });
        const data = response.data[coinId];
        console.log('data loaded', data);
        return {
            priceUSD: data.usd,
            marketCapUSD: data.usd_market_cap,
            change24h: data.usd_24h_change

        }
    }catch(error){
        console.error(`Error fetching data for ${coinId}:`, error);
        throw error;
    }
};

async function updatePrices(){
    try{
        // console.log('Updating... prices');
        for(let i=0; i<3; i++){
            const coinId = SUPPORTED_COINS[i];
            const data = await fetchCoinData(coinId) ;
            await CryptoPrice.create({
                coinId,
                priceUSD:data.priceUSD,
                marketCapUSD: data.marketCapUSD,
                change24h: data.change24h
            });
            console.log(`Updated price data for ${coinId}`);
        }
    }
    catch(error){
        console.error('Error updating price data:', error);
    }
}
async function startPriceUpdateJob() {
    console.log('Initial price data update...');
    await updatePrices();

    cron.schedule('0 */2 * * *', async () => {
        console.log('Fetching price data and updating database...');
        await updatePrices();  // Call the function to fetch and store data
        console.log('Price data updated after 2 hours.');
    });
}
module.exports= {startPriceUpdateJob} ;