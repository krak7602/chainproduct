import {AddAccount, ListAccounts} from "./AccountContract";
import {useEffect, useState} from "react";
import {ListItems} from "@/pages/SupplyChainContract";


export const AccountMaker = () => {

    const [data, setData] = useState([]);
    const [listState, setListState] = useState(false);
    const getList = async ()=> {
        const data = await ListAccounts();
        const selectedData = data.map(item=>({
            user: item.user,
            addr: item.addr,
            location: item.location
        }))
        // const verifiedData = data.filter((d1)=>{
        //     const owner = d1.ownerID.toLowerCase()
        //     return owner === window.ethereum._state.accounts[0]
        // })
        setData(selectedData);
        setListState(true);
    }
    useEffect( ()=> {
        // ListItems().then(data=>setData(data));
        getList();
    },[]);

    const handleCreate = async (event) => {
        event.preventDefault();
        await AddAccount(event.target.addr.value, event.target.user.value, event.target.location.value)
    }

    return (
        <div>
            <div className="flex justify-center items-center pt-16">
                <form className="w-full max-w-lg " onSubmit={handleCreate}>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Public Key
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text" placeholder="0x0000..." name="addr"/>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                User
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text" placeholder="Dohn Joe" name="user"/>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Location
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text" placeholder="37.33475625240411,-122.00899865291869" name="location"/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-1/3">
                            <button
                                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="submit">
                                Add Account
                            </button>
                        </div>
                        <div className="md:w-1/3">
                            <button
                                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button" onClick={getList}>
                                Refresh Accounts
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                {
                    listState &&
                    <div className="">
                        <div className=" flex shadow overflow-hidden rounded-xl border-b border-gray-20 m-8 items-center justify-center">
                            <table className="min-w-full bg-white ">
                                <thead className="bg-gray-800 text-white">
                                <tr >
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User</th>
                                    <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Public Address</th>
                                    <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Location</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                {
                                    data.map((item, index)=>(
                                        <tr key={index} className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200">
                                            <td className=" px-8 py-4">{item.user}</td>
                                            <td className="text-center px-8 py-4">{item.addr}</td>
                                            <td className="text-center px-8 py-4">{item.location}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>

    )

    // const [address, setAddress] = useState('');
    // const [user, setUser] = useState('');
    // const [location, setLocation] = useState('');
    // const [listAccState, setListState] = useState(false);
    // const [accList, setList] = useState([])
    //
    // function handleAddressChange(event) {
    //     setAddress(event.target.value);
    // }
    //
    // function handleUserChange(event) {
    //     setUser(event.target.value);
    // }
    //
    // function handleLocationChange(event) {
    //     setLocation(event.target.value);
    // }
    //
    // const AccountCreation = async (event) => {
    //     event.preventDefault();
    //     await AddAccount(address,user,location);
    // }
    //
    //
    // const ListAcc = async () => {
    //     const acc = await ListAccounts();
    //     // const data = acc.map((option)=> ({name: option.user}));
    //     // await setList(data);
    //     setList(acc);
    //     setListState(true);
    // }
    // return (
    //     <div>
    //         <form onSubmit={AccountCreation}>
    //             <div>
    //                 <label>Address:</label>
    //                 <input type="text" value={address} onChange={handleAddressChange}/>
    //             </div>
    //             <div>
    //                 <label>User:</label>
    //                 <input type="text" value={user} onChange={handleUserChange}/>
    //             </div>
    //             <div>
    //                 <label>Location:</label>
    //                 <input type="text" value={location} onChange={handleLocationChange}/>
    //             </div>
    //             <button type="submit">Add Account</button>
    //         </form>
    //         <button onClick={ListAcc}>List Accounts</button>
    //         {
    //             listAccState &&
    //             <ul>
    //                 {accList.map((item, index)=> (<li key={index}>{item}</li>))}
    //             </ul>
    //         }
    //     </div>
    // )
}


// export default CreateAndTransact;

