const { request } = require('express');
const CryptoPrice = require('../models/CryptoPrice');

async function getStats(req, res){
    try{
        console.log('request parameters',req.query);
        const coin = await req.query.coin ;
        // console.log(coin);
        
        if(!coin){
            return res.status(404).json({error:'Coin Parameter not found'});
        }
        else{
            const latestPrice = await CryptoPrice.findOne({coinId:coin})
            .sort({timestamp: -1}) ;
            if(!latestPrice){
                return res.status(404).json({error:'Data not found'});
            }
            return res.json({
                price: latestPrice.priceUSD,
                marketCap: latestPrice.marketCapUSD,
                "24hChange": latestPrice.change24h,
            });

        }
    }
    catch(error){
        console.log(error);
        return res.status(404).json({error:'Internal Server Error'});
    }
}

function calculateStandardDeviation(prices) {
    const mean = prices.reduce((sum, value) => sum + value, 0) / prices.length;
    const variance = prices.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / prices.length;
    return Math.sqrt(variance);
  }
async function getDeviation(req, res){
    try{
        // console.log('request parameters',req.query);
        const coin = await req.query.coin ;
        // console.log(coin);
        if(!coin){
            return res.status(404).json({error: 'Invalid coin parameter'});
        }
        // console.log('coin parameter', coin);
        const data = await CryptoPrice.find({coinId:coin})
        .sort({timestamp:-1})
        .limit(100)
        // console.log('data fetched for deviation', data);
        if(data.length === 0){
            return res.status(404).json({error:'Data insufficient to calculate deviation of the coin'}); 
        }
        let prices =[];
        for(let i=0; i<data.length; i++){
            prices.push(data[i].priceUSD);
        }
        const stdDeviation = calculateStandardDeviation(prices);
        return res.status(200).json({deviation:stdDeviation.toFixed(2)});
    }
    catch(error){
        console.error('Error calculating standard deviation:', error);
        return res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports = {getStats, getDeviation};