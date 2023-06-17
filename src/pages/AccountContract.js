import {ethers} from "ethers";
import Accounts from "../contracts/Accounts.json";
import getMetaMaskProvider from "./MetaMaskProvider";

const contractAddress = '0xf7916C7e5670741Ca62D1a05dD9B020DC03E6508';
const abi = Accounts.abi;

export const AddAccount = async (addr, user, location) => {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner(0);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = contract.connect(signer);
    const result = await contractWithSigner.addAccount(addr,user, location);
    await result.wait();
    console.log(result);
}

export const ListAccounts = async () => {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner(0);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = contract.connect(signer);
    const result = await contractWithSigner.listAccounts();
    // console.log(result);
    return result;
}

