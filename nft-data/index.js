require('dotenv').config();
const express = require('express');
const axios = require('axios');
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());
app.use(express.json());

// Cronos Etherscan API endpoint
const CRONOS_API_URL = 'https://api.etherscan.io/v2/api';

app.get('/nfts/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const apiKey = req.query.apikey || process.env.CRONOS_API_KEY;

    const response = await axios.get(CRONOS_API_URL, {
      params: {
        chainid: 25,
        module: 'account',
        action: 'tokennfttx',
        address: address,
        contractaddress: '0x2baa455e573df4019b11859231dd9e425d885293',
        startblock: 19320564,
        endblock: 99999999,
        sort: 'desc',
        apikey: apiKey
      }
    });

    if (response.data.status === '1') {
      const nftMap = new Map();

      response.data.result.forEach(tx => {
        const key = `${tx.contractAddress}-${tx.tokenID}`;
        const existing = nftMap.get(key);

        if (!existing || parseInt(tx.timeStamp) > parseInt(existing.timeStamp)) {
          nftMap.set(key, {
            // tokenName: tx.tokenName,
            // tokenSymbol: tx.tokenSymbol,
            tokenID: tx.tokenID,
            // contractAddress: tx.contractAddress,
            // from: tx.from,
            to: tx.to,
            // hash: tx.hash,
            timeStamp: tx.timeStamp
          });
        }
      });

      const nfts = Array.from(nftMap.values())
        .filter(nft => nft.to.toLowerCase() === address.toLowerCase())
        .sort((a, b) => parseInt(a.tokenID) - parseInt(b.tokenID));
      res.json({ success: true, nfts });
    } else {
      res.json({ success: false, message: response.data.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});