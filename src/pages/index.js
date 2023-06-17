import React, {useEffect} from 'react';
import {useState} from "react";
import getMetaMaskProvider from "./MetaMaskProvider";
import {AccountMaker} from "./AccountMaker";
import {CreateAndTransact} from "./CreateAndTransact";
import {redirect} from "next/navigation";
import {useRouter} from "next/router";
import {ListItems} from "@/pages/SupplyChainContract";
import {ItemList} from "@/pages/ItemList";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import Link from "next/link";
import {ItemCreate} from "@/pages/ItemCreate";
import {ItemTransfer} from "@/pages/ItemTransfer";
import {ItemDetails} from "@/pages/itemDetails";

export default function Home() {
    return (
        <div>
            <HomePage/>
        </div>

    );
}


const HomePage = () => {
    // const metaAcc = localStorage.getItem('metamask');
    // if(!metaAcc) {
    //     redirect('/login');
    // }

    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [showList, setList] = useState(true);
    const [showAddItem, setAddItem] = useState(false);
    const [showHistoryCheck, setHistoryCheck] = useState(false);
    const [showTransferItem, setTransferItem] = useState(false);
    const [showAddAccount, setAddAccount] = useState(false);
    const [checkCreator, setCreatorCheck] = useState(false);

    useEffect(()=> {

        // async function logOn() {
            const isLoggedIn = checkLoggedIn();
            setLoggedIn(isLoggedIn);
            // console.log(loggedIn);
            // console.log("Ether:", window.ethereum);
            // console.log(localStorage.getItem('metamask'))
            if(!isLoggedIn) {
                router.push('/login');
            }
            console.log(localStorage.getItem('metamask'));
            if(localStorage.getItem('metamask')==='0xB0e8dA0a5b1319C0b673D5E7a84A585C719Ff4C7'.toLowerCase()) {
                setCreatorCheck(true);
            }
        // }

        // logOn();

    }, []);

    const checkLoggedIn = () => {
        if (typeof window.ethereum !== 'undefined') {
            if (window.ethereum._state.accounts.length > 0) {
                return true;
            } else {
                return false;
            }
        }

    }

    const changeToList = () => {
        setList(true);
        setAddItem(false);
        setHistoryCheck(false);
        setTransferItem(false);
        setAddAccount(false);
    }

    const changeToAddItem = () => {
        setList(false);
        setAddItem(true);
        setHistoryCheck(false);
        setTransferItem(false);
        setAddAccount(false);
    }

    const changeToTransferItem = () => {
        setList(false);
        setAddItem(false);
        setHistoryCheck(false);
        setTransferItem(true);
        setAddAccount(false);
    }

    const changeToItemHistory = () => {
        setList(false);
        setAddItem(false);
        setHistoryCheck(true);
        setTransferItem(false);
        setAddAccount(false);
    }

    const changeToAddAccount = () => {
        setList(false);
        setAddItem(false);
        setHistoryCheck(false);
        setTransferItem(false);
        setAddAccount(true);
    }

    return (
      // <div className="bg-black text-white text-2xl rounded-2xl">
      <div>
          <nav className="bg-gray-800">
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                  <div className="relative flex items-center justify-between h-16">
                      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                          <div className="flex-shrink-0 flex items-center">
                              <Link href="/">
                                  <div className="text-white font-bold text-xl">SupplyTrace</div>
                              </Link>
                          </div>
                          <div className="hidden sm:block sm:ml-6">
                              <div className="flex space-x-4">
                                  <div onClick={changeToList}>
                                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                          List Items
                                      </div>
                                  </div>
                                  <div onClick={changeToAddItem}>
                                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                          Add Item
                                      </div>
                                  </div>
                                  <div onClick={changeToTransferItem}>
                                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                          Transfer Item
                                      </div>
                                  </div>
                                  <div onClick={changeToItemHistory}>
                                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                          Show Details
                                      </div>
                                  </div>
                                  {
                                     checkCreator &&
                                      <div onClick={changeToAddAccount}>
                                          <div className="text-gray-700 hover:bg-gray-600 hover:text-white px-3 py-2 bg-amber-50 rounded-md text-sm font-medium">
                                              Manage Distribution Points
                                          </div>
                                      </div>
                                  }

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
          {
              showList &&
              <div><ItemList/></div>
          }
          {
              showAddItem &&
              <div><ItemCreate/></div>
          }
          {
              showAddAccount &&
              <div><AccountMaker/></div>
          }
          {
              showTransferItem &&
              <div><ItemTransfer/></div>
          }
          {
              showHistoryCheck &&
              <div><ItemDetails/></div>
          }
      </div>
    );


}
// const MetaMaskConnector = () => {
//     const [isConnected, setIsConnected] = useState(false);
//
//     const connectWallet = async () => {
//         try {
//             if (typeof window !== "undefined") {
//                 const {ethereum} = window
//                 if (!ethereum) {
//                     alert('Please install MetaMask!')
//                 }
//                 const accounts = await ethereum.request({
//                     method: 'eth_requestAccounts',
//                 });
//                 const provider = await getMetaMaskProvider();
//                 console.log(provider);
//                 const signer = await provider.getSigner(0);
//                 setIsConnected(true);
//                 // fetc
//             }
//
//         } catch (error) {
//             setIsConnected(false);
//         }
//     }
//
//     return (
//         <div>
//             {/*<button onClick={connectWallet}>Connect MetaMask</button>*/}
//             {/*{*/}
//                 // isConnected &&
//                 <div>
//                     {/*<p>MetaMask connected successfully!</p>*/}
//                     {
//                         show
//                     }
//
//                     <CreateAndTransact/>
//                     <AccountMaker/>
//                 </div>
//
//             {/*}*/}
//         </div>
//     );
//
// }