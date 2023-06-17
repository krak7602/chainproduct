import {ethers} from "ethers";
import Accounts from "../contracts/SupplyChain.json";
import getMetaMaskProvider from "./MetaMaskProvider";

const contractAddress = '0x2921267C9a0E5a41537E4502f5fEf478c897e1e9';
const abi = Accounts.abi;

export const CreateItem = async (addr, name) => {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner(0);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = contract.connect(signer);
    const result = await contractWithSigner.createItem(addr, name);
    await result.wait();
    console.log(result);
}

export const CheckDetails = async (id) => {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner(0)
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = contract.connect(signer)
    const result = await contractWithSigner.getItem(id);
    console.log(result)
    return result;
}

export const TransferItem = async (addr, id) => {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner(0)
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = contract.connect(signer)
    const result = await contractWithSigner.transferItem(addr, id);
    await result.wait();
    console.log(result)
    return result;
}
export const ViewHistory = async (id) => {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner(0)
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const result = await contract.viewHistory(id);
    console.log(result)
    return result;
}

export const ListItems = async () => {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner(0)
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const result = await contract.listItem();
    console.log(result);
    return result;
}