import { useParams } from "react-router-dom";
import Header from "../Main/components/Header/Header.jsx";
import Button from "../../components/Button/Button.jsx";
import { useBasket } from "../../context/BasketContex.jsx";

const products = [
    {
        id: 1,
        title: "باقلوا",
        price: 12.99,
        image: "/products/1.jpg",
        description: "باقلوا یک شیرینی سنتی خوشمزه و مقوی است که از لایه‌های نازک خمیر و مغزهای آسیاب‌شده مثل گردو و بادام ساخته می‌شود. شیرینی با شهد شیرین پوشانده شده و هر لقمه آن طعم بی‌نظیری دارد. مناسب برای سرو همراه چای یا به عنوان هدیه."
    },
    {
        id: 2,
        title: "کیک یزدی",
        price: 7.49,
        image: "/products/2.jpg",
        description: "کیک یزدی یک کیک کوچک و نرم است که با طعم وانیل و کره تهیه می‌شود. بافت آن سبک و لطیف است و شیرینی ملایم آن آن را به میان‌وعده‌ای ایده‌آل برای هر زمان روز تبدیل می‌کند."
    },
    {
        id: 3,
        title: "شیرینی دانمارکی",
        price: 39.99,
        image: "/products/3.jpg",
        description: "شیرینی دانمارکی یک شیرینی لایه‌ای کرم‌دار است که با کره و شکر درست می‌شود. بافت نرم و کرمی داخل و لایه‌های ترد بیرونی آن، تجربه‌ای لذت‌بخش از طعم شیرینی اروپایی را ارائه می‌دهد. مناسب برای صبحانه یا عصرانه."
    },
];

export function ProductDetails()
{
    const { id } = useParams(); // get id from URL
    const { addItem } = useBasket(); // use basket service directly

    const product = products.find(p => p.id === Number(id));

    if (!product)
    {
        return <p>محصول پیدا نشد</p>;
    }

    const handleAddToBasket = () =>
    {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    return (
        <>
            <div className="max-w-md mx-auto">
                <img
                    src={ product.image }
                    alt={ product.title }
                    className="w-full h-auto object-cover rounded"
                />
                <h2 className="mt-4 font-semibold text-xl">{ product.title }</h2>
                <p className="text-gray-700 text-lg font-medium">{ product.price }$</p>
                <p className="mt-2 text-gray-600 text-sm">{ product.description }</p>
                <Button onClick={ handleAddToBasket }>افزودن به سبد</Button>
            </div>
        </>
    );
}
