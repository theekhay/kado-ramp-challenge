## Description

[Assessment] Development of a simple ramp application.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev
```

## Test

```bash
# running unit tests
$ npm run test
```


## Environmental variables

```bash

#Tatum API key ( gotten on account dashboard)
- TATUM_API_KEY=xxx
- TATUM_BASE_URL=https://api.tatum.io
- TATUM_ETH_TRANSFER_ENDPOINT=/v3/ethereum/transaction
- TATUM_RATE_ENDPOINT=/v3/tatum/rate/{currency}
- TATUM_REQUERY_ETH_TRANSACTION=/v3/ethereum/transaction/{hash}

# Settlement ETH address (This is a private key and should not be exposed)
- ETH_WALLET_ADDRESS=xxx

#Port number
- PORT=xxxx

# MONGO DB connection string
- MONGO_URI=xxx

# Self-hosted notification service credentials
- NOTIFICATION_SERVICE_HOST=xxx
- NOTIFICATION_SERVICE_PORT=xxx
```

## Docker

```
# To build the docker image, run the command:
$ docker build -t iboov-auth .

# To run the image, run the command:
$ docker run -p 7000:7000 kado
```

## Integration Docs
To view the integration documents, kindly follow the link below
- doc - [documentation](https://kado-aassessment-api.herokuapp.com/api)
