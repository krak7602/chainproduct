import React from 'react';
import {useState} from "react";
import getMetaMaskProvider from "./MetaMaskProvider";
// import {redirect} from "next/navigation";
import {useRouter} from "next/router";
// import {AccountMaker} from "./AccountMaker";
// import {CreateAndTransact} from "./CreateAndTransact";

export default function login() {
    return (
        <MetaMaskConnector/>
    );
}

const MetaMaskConnector = () => {
    // const [isConnected, setIsConnected] = useState(false);

    const router = useRouter();
    const connectWallet = async () => {
        // try {
        if (typeof window !== "undefined") {
            const {ethereum} = window
            if (!ethereum) {
                alert('Please install MetaMask!')
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            const provider = await getMetaMaskProvider();
            console.log(provider);
            const signer = await provider.getSigner(0);
            // setIsConnected(true);
            localStorage.setItem("metamask", accounts[0])
            console.log(localStorage.getItem("metamask"))
            await router.push('/');

        }
        // } catch (error) {
        //     setIsConnected(false);
        // }
    }

    return (
        <div className="flex items-center h-screen justify-center">
            <button className="px-4 py-2 font-bold hover:bg-green-400 bg-green-500 text-white rounded " onClick={connectWallet}>Connect MetaMask</button>
        </div>
    );

}