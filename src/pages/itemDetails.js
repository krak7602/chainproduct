import {CheckDetails, CreateItem} from "./SupplyChainContract";
import html2canvas from "html2canvas";
import {useRouter} from "next/router";
import React, {useState} from "react";
import QRCode from "react-qr-code";

export const ItemDetails = () => {
    const router = useRouter();
    const [itemData, setItemData] = useState([]);
    const [history, setHistory] = useState([]);
    const [load, setLoad] = useState(false);
    const handleShow = async (event) => {
        event.preventDefault();
        // await CreateItem(localStorage.getItem('metamask'), event.target.name.value)
        const data = await CheckDetails(event.target.itemID.value);
        const selectedData = {
            name: data.name,
            itemID: parseInt(data.itemID._hex, 16),
            ownerID: data.ownerID
        }
        setHistory(data.ownersHistory)
        setItemData(selectedData)
        setLoad(true)
    }



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
            <div className="flex justify-center items-center pt-28">
                <form onSubmit={handleShow} className="w-full max-w-sm">
                    <div className="flex items-center border-b border-blue-500 py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Item ID" type="text" name="itemID" />
                        <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Show Details</button>
                    </div>
                </form>
            </div>
            {
                load &&
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
            }
        </div>
    )
}