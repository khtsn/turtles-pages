const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { ethers, Contract } = require('ethers')
const storageURL = "https://turtlesnfts.zack.vn"
const nftAddress = "0x2baa455e573df4019b11859231dd9e425d885293"
const provider = new ethers.JsonRpcProvider("https://evm.cronos.org/")
const abi = require('./abi.json')
const contract = new Contract(nftAddress, abi, provider)
var cache = require('express-redis-cache')();

const getMetadata = async (req, res) => {
    try {
        const tokenId = parseInt(req.params['id']) + 1
        const totalSupply = await contract.totalSupply()
        if (tokenId > totalSupply) {
            res.status(404).send({})
        }
        const url = await fetch(storageURL + "/" + tokenId + ".json")
        res.send(await url.json())
    } catch {
        res.status(404).send({})
    }
}

app.get('/:id.png', async (req, res) => {
    try {
        const tokenId = parseInt(req.params['id'])
        const totalSupply = await contract.totalSupply()
        if (tokenId > totalSupply) {
            res.status(404).send({})
        }
        const url = await fetch(storageURL + "/" + tokenId + ".png")
        res.setHeader('content-type', 'image/png');
        res.setHeader('cache-control', 'max-age=5184000')
        res.send(await url.bytes())
    } catch {
        res.status(404).send({})
    }
})
app.get('/:id.json', cache.route({type: 'application/json'}), getMetadata)
app.get('/:id', cache.route({type: 'application/json'}), getMetadata)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})