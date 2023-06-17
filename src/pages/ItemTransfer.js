import {CreateItem, CheckDetails, TransferItem, ViewHistory, ListItems} from "./SupplyChainContract";
import {ListAccounts} from "./AccountContract";
import {useEffect, useState} from "react";
import Select from 'react-select'

export const ItemTransfer = () => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);


    const [itemData, setItemData] = useState([]);
    const [listItemState, setListItemState] = useState(false);
    const [accountData, setAccountData] = useState([]);
    const [listAccountState, setListAccountState] = useState(false);

    useEffect( ()=> {
        // ListItems().then(data=>setData(data));
        const getList = async ()=> {
            const data = await ListItems();
            const selectedData = data.map(item=>({
                name: item.name,
                itemID: item.itemID,
                ownerID: item.ownerID,
                label: parseInt(item.itemID._hex, 16)
            }))
            const verifiedData = selectedData.filter((d1)=>{
                const owner = d1.ownerID.toLowerCase()
                return owner === window.ethereum._state.accounts[0]
            })
            setItemData(verifiedData);
            setListItemState(true);
        }
        getList();
    },[]);



    useEffect( ()=> {
        // ListItems().then(data=>setData(data));
        const getList = async ()=> {
            const data = await ListAccounts();
            const selectedData = data.map(item=>({
                user: item.user,
                addr: item.addr,
                location: item.location,
                label: item.user
            }))
            // const verifiedData = data.filter((d1)=>{
            //     const owner = d1.ownerID.toLowerCase()
            //     return owner === window.ethereum._state.accounts[0]
            // })
            setAccountData(selectedData);
            setListAccountState(true);
        }
        getList();
    },[]);


    const handleItemChange = (selectedOption) => {
        setSelectedItem(selectedOption);
    };
    const handleAccountChange = (selectedOption) => {
        setSelectedAccount(selectedOption);
    };
    const handleTransfer = async () => {
        console.log("Item:", selectedItem);
        console.log("Account:", selectedAccount);
        const result = await TransferItem(selectedAccount.addr,selectedItem.label);
        console.log(result);
    }

    return (
        <div>
            <div className="justify-center flex">
                <div className="w-1/2 pt-4">
                    <Select
                        value={selectedItem}
                        onChange={handleItemChange}
                        options={itemData}
                        placeholder="Select ItemID"
                        className="py-2"
                    />
                    <Select
                        value={selectedAccount}
                        onChange={handleAccountChange}
                        options={accountData}
                        placeholder="Select User"
                        className="py-4"
                    />
                    <div className="flex justify-center">
                        <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-2 px-2 rounded w-1/2" onClick={handleTransfer}>Transfer Item</button>
                    </div>

                </div>
            </div>

        </div>

    );
    // const [accList, setList] = useState([])
    // // const [listAccState, setListState] = useState(false);
    // const [acc, setAcc] = useState('');
    // const ItemCreation = async () => {
    //     await CreateItem(localStorage.getItem('metamask'), 'Chicken');
    // }
    //
    // useEffect(()=> {
    //     ListAcc();
    // },[])
    //
    // const DetailsCheck = async () => {
    //     await CheckDetails(1);
    // }
    //
    // const ListAcc = async () => {
    //     const accL = await ListAccounts();
    //     // const data = acc.map((option)=> ({name: option.user}));
    //     // await setList(data);
    //     setList(accL);
    //     // setListState(true);
    //     // return acc.map((option)=>(option.user));
    // }
    //
    // const getList = () => {
    //     return accList;
    // }
    //
    // function handleAccChange(event) {
    //     setAcc(event.target.value);
    //     console.log(acc);
    // }
    // const ItemTransfer = async () => {
    //     console.log(acc);
    //     const result = await TransferItem(acc,6);
    //     console.log(result);
    // }
    //
    // const HistoryCheck = async () => {
    //     const res = await ViewHistory(1);
    //     console.log(res);
    // }
    //
    // return (
    //     <div>
    //         <button onClick={ItemCreation}>Create Item</button>
    //         <button onClick={DetailsCheck}>Check details</button>
    //         <button onClick={HistoryCheck}>View History</button>
    //         <div>
    //             <select  onChange={handleAccChange}  >
    //                 <option key={0} value={''}>Select option</option>
    //                 {getList().map((option, index)=>(<option key={index+1} value={option.addr}>{option.user}</option>))}
    //             </select>
    //             <button onClick={ItemTransfer}>Transfer Item</button>
    //
    //         </div>
    //
    //
    //     </div>
    // )
}


// export default CreateAndTransact;

