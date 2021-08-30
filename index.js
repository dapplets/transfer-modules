const ethers = require('ethers');
const abi = require('./abi.json');
const types = require('./types.json');

const MNEMONIC = "witch collapse practice feed shame open despair creek road again ice least";
const TARGET_OWNER = "0x0000000000000000000000000000000000000000";
const PROVIDER_URL = 'http://localhost:8501';

async function start() {
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL, 4);
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);
    const contract = new ethers.Contract('0xb76b02b35ad7cb71e2061056915e521e8f05c130', abi, wallet);
    const events = await contract.queryFilter('ModuleInfoAdded');
    const mis = await Promise.all(events.map(async ev => {
        const tx = await provider.getTransaction(ev.transactionHash);
        const decoded = ethers.utils.defaultAbiCoder.decode(types, ethers.utils.hexDataSlice(tx.data, 4));
        const mi = await contract.getModuleInfoByName(decoded.mInfo.name);
        return mi;
    }));

    const allModules = mis.map(x => ({ name: x.name, owner: x.owner.replace('0x000000000000000000000000', '0x') }));
    const myModules = allModules.filter(x => x.owner.toLowerCase() === wallet.address.toLowerCase());

    console.log(`Found ${myModules.length} addresses.`)

    let i = 0;
    for (const module of myModules) {
        await contract.transferOwnership(
            module.name,
            module.owner.replace('0x', '0x000000000000000000000000'),
            TARGET_OWNER.replace('0x', '0x000000000000000000000000')
        );
        i++;
        console.log(`${i}/${myModules.length} ${module.name}`);
    }
}

start();