require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { ethers, Contract } = require('ethers')
const fs = require('fs')
const path = require('path')
const storageURL = process.env.STORAGE_URL
const nftAddress = process.env.NFT_ADDRESS
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const abi = require('./abi.json')
const contract = new Contract(nftAddress, abi, provider)
const proxy = require('express-http-proxy');

const ENABLE_FILE_CACHE = process.env.ENABLE_FILE_CACHE !== 'false'
const CACHE_DIR = path.join(__dirname, 'cache')
if (ENABLE_FILE_CACHE && !fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true })

let totalSupplyCache = null
let cacheTime = 0
const CACHE_TTL = 60000 // 1 minute
const MAX_CACHE_SIZE = 100 // Cache only 100 most recent items (~200MB)
const fileCache = new Map()

const setCache = (key, value) => {
  if (fileCache.size >= MAX_CACHE_SIZE) {
    const firstKey = fileCache.keys().next().value
    fileCache.delete(firstKey)
  }
  fileCache.delete(key)
  fileCache.set(key, value)
}

const getTotalSupply = async () => {
  const now = Date.now()
  if (totalSupplyCache && now - cacheTime < CACHE_TTL) {
    return totalSupplyCache
  }
  totalSupplyCache = await contract.totalSupply()
  cacheTime = now
  return totalSupplyCache
}

const getMetadata = async (req, res, next) => {
    const tokenId = parseInt(req.params['id']) + 1
    const totalSupply = await getTotalSupply()
    if (tokenId > totalSupply) {
        res.status(404).send({})
    }
    next()
}

app.get('/:id.png', async (req, res, next) => {
    const tokenId = parseInt(req.params['id'])
    const totalSupply = await getTotalSupply()
    if (tokenId > totalSupply) {
        return res.status(404).send({})
    }
    if (ENABLE_FILE_CACHE) {
        const filePath = path.join(CACHE_DIR, `${tokenId}.png`)
        if (fs.existsSync(filePath)) {
            res.set('Cache-Control', 'public, max-age=31536000, immutable')
            res.set('Content-Type', 'image/png')
            return res.sendFile(filePath)
        }
    }
    res.set('Cache-Control', 'public, max-age=31536000, immutable')
    next()
}, proxy(storageURL, {
    userResDecorator: (proxyRes, proxyResData, req) => {
        if (ENABLE_FILE_CACHE) {
            const tokenId = parseInt(req.params['id'])
            const filePath = path.join(CACHE_DIR, `${tokenId}.png`)
            fs.writeFileSync(filePath, proxyResData)
        }
        return proxyResData
    }
}))
app.get('/:id.json', getMetadata, (req, res, next) => {
    const tokenId = parseInt(req.params['id']) + 1
    if (ENABLE_FILE_CACHE) {
        const filePath = path.join(CACHE_DIR, `${tokenId}.json`)
        if (fs.existsSync(filePath)) {
            res.set('Cache-Control', 'public, max-age=31536000, immutable')
            res.set('Content-Type', 'application/json')
            return res.sendFile(filePath)
        }
    }
    res.set('Cache-Control', 'public, max-age=31536000, immutable')
    next()
}, proxy(storageURL, {
    proxyReqPathResolver: function (req) {
      return '/' + (parseInt(req.params['id']) + 1) +'.json';
    },
    userResDecorator: (proxyRes, proxyResData, req) => {
        if (ENABLE_FILE_CACHE) {
            const tokenId = parseInt(req.params['id']) + 1
            const filePath = path.join(CACHE_DIR, `${tokenId}.json`)
            fs.writeFileSync(filePath, proxyResData)
        }
        return proxyResData
    }
  }))
app.get('/:id', getMetadata, (req, res, next) => {
    const tokenId = parseInt(req.params['id']) + 1
    if (ENABLE_FILE_CACHE) {
        const filePath = path.join(CACHE_DIR, `${tokenId}.json`)
        if (fs.existsSync(filePath)) {
            res.set('Cache-Control', 'public, max-age=31536000, immutable')
            res.set('Content-Type', 'application/json')
            return res.sendFile(filePath)
        }
    }
    res.set('Cache-Control', 'public, max-age=31536000, immutable')
    next()
}, proxy(storageURL, {
    proxyReqPathResolver: function (req) {
      return '/' + (parseInt(req.params['id']) + 1) +'.json';
    },
    userResDecorator: (proxyRes, proxyResData, req) => {
        if (ENABLE_FILE_CACHE) {
            const tokenId = parseInt(req.params['id']) + 1
            const filePath = path.join(CACHE_DIR, `${tokenId}.json`)
            fs.writeFileSync(filePath, proxyResData)
        }
        return proxyResData
    }
  }))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
    console.log(`File cache: ${ENABLE_FILE_CACHE ? 'enabled' : 'disabled'}`)
})