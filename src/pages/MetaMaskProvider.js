import {ethers} from "ethers";

const getMetaMaskProvider = async () => {
    if (typeof window !== "undefined") {
        const {ethereum} = window;
        if (!ethereum) {
            alert('Please install MetaMask!');
        }
        // const accounts = await ethereum.request({
        //     method: 'eth_requestAccounts',
        // });

        const ethersProvider = new ethers.providers.Web3Provider(ethereum, 'sepolia');
        return ethersProvider;
    }
}

export default getMetaMaskProvider;