require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { ethers, Contract } = require('ethers')
const storageURL = process.env.STORAGE_URL
const nftAddress = process.env.NFT_ADDRESS
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const abi = require('./abi.json')
const contract = new Contract(nftAddress, abi, provider)
const proxy = require('express-http-proxy');

const getMetadata = async (req, res, next) => {
    const tokenId = parseInt(req.params['id']) + 1
    const totalSupply = await contract.totalSupply()
    if (tokenId > totalSupply) {
        res.status(404).send({})
    }
    next()
}

app.get('/:id.png', async (req, res, next) => {
    const tokenId = parseInt(req.params['id'])
    const totalSupply = await contract.totalSupply()
    if (tokenId > totalSupply) {
        res.status(404).send({})
    }
    next()
}, proxy(storageURL))
app.get('/:id.json', getMetadata, proxy(storageURL, {
    proxyReqPathResolver: function (req) {
      return '/' + (parseInt(req.params['id']) + 1) +'.json';
    }
  }))
app.get('/:id', getMetadata, proxy(storageURL, {
    proxyReqPathResolver: function (req) {
      return '/' + (parseInt(req.params['id']) + 1) +'.json';
    }
  }))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})