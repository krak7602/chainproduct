import {CreateItem} from "./SupplyChainContract";

export const ItemCreate = () => {
    const handleCreate = async (event) => {
        event.preventDefault();
        await CreateItem(localStorage.getItem('metamask'), event.target.name.value)
    }

    return (
        <div>
            <div className="flex justify-center items-center pt-28">
                <form onSubmit={handleCreate} className="w-full max-w-sm">
                    <div className="flex items-center border-b border-blue-500 py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Item Name" type="text" name="name" />
                        <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Add Item</button>
                    </div>
                </form>
            </div>

        </div>
    )
}