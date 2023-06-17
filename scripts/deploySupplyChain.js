const {ethers} = require("hardhat");

async function main() {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const spChain = await SupplyChain.deploy()
    await spChain.deployed()
    console.log("Contract deployed to:", spChain.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });