import {CreateItem, CheckDetails, TransferItem, ViewHistory} from "./SupplyChainContract";
import {ListAccounts} from "./AccountContract";
import {useEffect, useState} from "react";


export const CreateAndTransact = () => {

    const [accList, setList] = useState([])
    // const [listAccState, setListState] = useState(false);
    const [acc, setAcc] = useState('');
    const ItemCreation = async () => {
        await CreateItem(localStorage.getItem('metamask'), 'Chicken');
    }

    useEffect(()=> {
        ListAcc();
    },[])

    const DetailsCheck = async () => {
        await CheckDetails(1);
    }

    const ListAcc = async () => {
        const accL = await ListAccounts();
        // const data = acc.map((option)=> ({name: option.user}));
        // await setList(data);
        setList(accL);
        // setListState(true);
        // return acc.map((option)=>(option.user));
    }

    const getList = () => {
        return accList;
    }

    function handleAccChange(event) {
        setAcc(event.target.value);
        console.log(acc);
    }
    const ItemTransfer = async () => {
        console.log(acc);
        const result = await TransferItem(acc,6);
        console.log(result);
    }

    const HistoryCheck = async () => {
        const res = await ViewHistory(1);
        console.log(res);
    }

    return (
        <div>
            <button onClick={ItemCreation}>Create Item</button>
            <button onClick={DetailsCheck}>Check details</button>
            <button onClick={HistoryCheck}>View History</button>
            <div>
                <select  onChange={handleAccChange}  >
                    <option key={0} value={''}>Select option</option>
                    {getList().map((option, index)=>(<option key={index+1} value={option.addr}>{option.user}</option>))}
                </select>
                <button onClick={ItemTransfer}>Transfer Item</button>

            </div>


        </div>
    )
}


// export default CreateAndTransact;

