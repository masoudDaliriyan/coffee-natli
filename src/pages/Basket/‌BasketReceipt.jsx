import "./basketRecipent.css";
const BasketReceipt = ({ recipientData }) =>
{
    console.log(recipientData);
    const { name, items = [] } = recipientData;

    // Helper to format numbers with commas and add ریال
    // const formatPrice = (price) =>
    // {
    //     if (!price) return "-";
    //     return Number(price).toLocaleString("fa-IR") + " ریال";
    // };
    return (
        <div className="max-w-md mx-auto">
            { items.map(item => (
                <div
                    key={ item.id }
                    className="flex items-center gap-4 p-4 mb-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                >
                    <div className="flex-1 text-right">
                        <div className="text-base font-semibold mb-2">{ item.title }</div>
                        <div className="text-gray-600 text-sm mb-2">
                            { Number(item.price * item.amount).toLocaleString("fa-IR") } تومان
                        </div>
                        <div className="mt-2">
                            <label className="mr-2">تعداد:</label>
                            <input
                                type="number"
                                value={ item.amount }
                                min="1"
                                className="border p-1 rounded w-20 text-center"
                            // optional: onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )) }
        </div>
    );
};

export default BasketReceipt;