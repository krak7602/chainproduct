import {ListItems} from './SupplyChainContract'
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {useRouter} from "next/router";
import Link from "next/link";
export const ItemList = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [listState, setListState] = useState(false);
    useEffect( ()=> {
        // ListItems().then(data=>setData(data));
        const getList = async ()=> {
            const data = await ListItems();
            const selectedData = data.map(item=>({
                name: item.name,
                itemID: item.itemID,
                ownerID: item.ownerID
            }))
            const verifiedData = selectedData.filter((d1)=>{
                const owner = d1.ownerID.toLowerCase()
                return owner === window.ethereum._state.accounts[0]
            })
            setData(verifiedData);
            setListState(true);
        }
        getList();
    },[]);


    const handleRedirect = (val) => {

        router.push('/block/'+1)
    }


    return (
        // <button onClick={ListItems}>Item List</button>
        <div>
            {
                listState &&
                <div className="px-96">
                <div className=" flex shadow overflow-hidden rounded-xl border-b border-gray-20 m-8 items-center justify-center">
                <table className="min-w-full bg-white ">
                    <thead className="bg-gray-800 text-white">
                    <tr >
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ItemID</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Name</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {
                        data.map((item, index)=>(

                            <tr key={index} className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200">
                                    <td className="text-left px-8 py-4">
                                        <Link href={`/block/${parseInt(item.itemID._hex, 16)}`}>
                                        {parseInt(item.itemID._hex, 16)}
                                        </Link>
                                    </td>
                                    <td className="text-center px-8 py-4">
                                        <Link href={`/block/${parseInt(item.itemID._hex, 16)}`}>
                                        {item.name}
                                        </Link>
                                    </td>

                            </tr>

                        ))
                    }
                    </tbody>
                </table>
                </div>
                </div>
            }
        </div>

    );
}