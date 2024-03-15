import { useEffect, useState } from "react";
import fruitsData from "./fruits.json";

function App() {
  const [basket, setBasket] = useState([]);
  const [basketBreakUpPrice, setBasketBreakUpPrice] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let newTotalPrice = Object.values(basketBreakUpPrice).reduce(
      (pV, cV) => pV + cV,
      0
    );

    setTotalPrice(newTotalPrice);
  }, [basketBreakUpPrice]);

  const handleAddToBasket = (offer, fruitName, price) => {
    let newBasket = [...basket, fruitName];

    let basketItemCount = 0;

    newBasket.forEach((fruit) => {
      if (fruit === fruitName) basketItemCount++;
    });

    if (offer) {
      setBasketBreakUpPrice({
        ...basketBreakUpPrice,
        [fruitName]:
          price *
          Math.ceil((basketItemCount / (offer?.buy + offer?.get)) * offer?.buy),
      });
    } else {
      setBasketBreakUpPrice({
        ...basketBreakUpPrice,
        [fruitName]: basketItemCount * price,
      });
    }

    setBasket(newBasket);
  };

  return (
    <>
      <div className="text-center p-6 font-extrabold text-3xl flex justify-evenly">
        <div>Basket Items: {basket.length}</div>
        <div>Total Price: {totalPrice}</div>
      </div>
      <div className="grid grid-cols-2 gap-8 p-8 -mt-4 justify-center items-center">
        {Object.keys(fruitsData).map((fruitName) => {
          const { price, offer } = fruitsData[fruitName];

          return (
            <div
              key={fruitName}
              className="flex justify-center items-center flex-col"
            >
              <img
                className="py-6 h-40"
                src={require(`./assets/${fruitName}.webp`)}
                alt={fruitName}
              />
              <span className="font-semibold text-center">
                Price: ₹ {price} /-
              </span>
              {offer?.statement && (
                <span className="px-2 py-1 mt-2 font-extrabold ">
                  {offer?.statement}
                </span>
              )}
              <button
                className="mt-4 border rounded-lg p-2 font-extrabold"
                onClick={() => handleAddToBasket(offer, fruitName, price)}
              >
                Add to basket
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
