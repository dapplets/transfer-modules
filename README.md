# Mass Ownership Transferring of Modules

## Getting Started

1. Install dependenices

```
npm i
```

2. Change constants in the `index.js` file.

* `MNEMONIC` - mnemonic of source account.
* `TARGET_OWNER` - address of target account.
* `PROVIDER_URL` - Ethereum JSON RPC provider URL.

```javascript
const MNEMONIC = "witch collapse practice feed shame open despair creek road again ice least";
const TARGET_OWNER = "0x0000000000000000000000000000000000000000";
const RINKEBY_PROVIDER_URL = 'http://localhost:8501';
```

3. Run transferring
```
npm start
```