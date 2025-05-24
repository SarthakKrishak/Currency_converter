import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center bg-cover bg-no-repeat px-4 py-6 sm:px-6 md:px-12"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/29110760/pexels-photo-29110760/free-photo-of-close-up-image-of-a-bitcoin-in-dark-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full max-w-lg bg-white/40 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border border-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white drop-shadow">
            Currency Converter
          </h1>

          <div className="mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOption={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>

          <div className="relative text-center mb-4">
            <button
              type="button"
              onClick={swap}
              className="inline-block border border-white bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-1 transition"
            >
              Swap
            </button>
          </div>

          <div className="mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOption={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
