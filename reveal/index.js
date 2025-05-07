const express = require('express')
const app = express()
const port = 3000
const { ethers, Contract } = require('ethers')
const storageURL = "https://turtlesnfts.zack.vn"

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/:id.json', async (req, res) => {
    try {
        const tokenId = parseInt(req.params['id'])
        const provider = new ethers.JsonRpcProvider("https://evm.cronos.org/")
        const abi = require('./abi.json')
        const contract = new Contract("0x2baa455e573df4019b11859231dd9e425d885293", abi, provider)
        const totalSupply = await contract.totalSupply()
        if (tokenId >= totalSupply) {
            res.status(404).send({})
        }
        const url = await fetch(storageURL + "/" + tokenId + ".json")
        res.send(await url.json())
    } catch {
        res.send({})
    }
})

app.get('/:id.png', async (req, res) => {
    try {
        const tokenId = parseInt(req.params['id'])
        const provider = new ethers.JsonRpcProvider("https://evm.cronos.org/")
        const abi = require('./abi.json')
        const contract = new Contract("0x2baa455e573df4019b11859231dd9e425d885293", abi, provider)
        const totalSupply = await contract.totalSupply()
        if (tokenId >= totalSupply) {
            res.status(404).send({})
        }
        const url = await fetch(storageURL + "/" + tokenId + ".png")
        res.setHeader('content-type', 'image/png');
        res.send(await url.bytes())
    } catch {
        res.send({})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})