import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import {CheckDetails, ListItems} from "@/pages/SupplyChainContract";
import Link from "next/link";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

export default function BlogPost() {
    const router = useRouter();
    const [itemData, setItemData] = useState([]);
    const [history, setHistory] = useState([]);

    const { slug } = router.query;

    useEffect( ()=> {
        // ListItems().then(data=>setData(data));
        const getItem = async ()=> {
            const data = await CheckDetails(parseInt(slug));
            // console.log();
            // console.log("Data:",data);
            const selectedData = {
                name: data.name,
                itemID: parseInt(data.itemID._hex, 16),
                ownerID: data.ownerID
            }
            // console.log(data.ownersHistory)
            setHistory(data.ownersHistory)
            setItemData(selectedData)
            // setHistory(data.ownersHistory)
            // const selectedData = data.map(item=>({
            //     name: item.name,
            //     itemID: item.itemID,
            //     ownerID: item.ownerID
            // }))
            //
            // console.log(selectedData.ownerID);
            // const verifiedData = selectedData.filter((d1)=>{
            //     const owner = d1.ownerID.toLowerCase()
            //     return owner === window.ethereum._state.accounts[0]
            // })
            // setData(verifiedData);
            // setListState(true);
        }
        getItem();
    },[]);

    const downl = async () => {
        const element = document.getElementById("print");
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        console.log("Link:", link);
        link.href = data;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
    }

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className={"bg-green-500 p-5 rounded-xl"}>
                    <div>Item ID: {itemData.itemID}</div>
                    <div>Name:  {itemData.name}</div>
                    <div>ownerID:{itemData.ownerID}</div>
                    <div>
                        <div>Owner History:</div>
                        <div>
                            {
                                history.map((item, index)=>(
                                    <div key={index}>
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div id='print' className=" flex items-center justify-center pr-12 pt-16">
                        <QRCode onClick={downl} value={`https://localhost:3000/block/${itemData.itemID}`} size={128}/>
                    </div>
                </div>
            </div>
        </div>
    );
}