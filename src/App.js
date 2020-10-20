import React, { useEffect , useState} from 'react'
import './App.css';
import CurrencyRow from './CurrencyRow'

// fetch the api we gonna use useEffect first parameter is function second parameter is array
const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {

const [currencyOption, setCurrencyOptions] = useState([])
const [fromCurrency, setFromCurrency] = useState()
const [toCurrency, setToCurrency] = useState()
const [exchangeRate, setExchangeRate] = useState()
const [amount, setAmount] = useState(1)
const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
console.log(exchangeRate)

let toAmount, fromAmount
if(amountInFromCurrency){
  fromAmount =amount
  toAmount = amount * exchangeRate
}
else{
  toAmount = amount
  fromAmount = amount / exchangeRate
}

useEffect( ( )=> {
fetch(BASE_URL)
.then(res => res.json()) 
.then(data => { 
  const firstCurrency = Object.keys(data.rates)[0]
  setCurrencyOptions([data.base, ...Object.keys(data.rates)])
  setFromCurrency(data.base)
  setToCurrency(firstCurrency)
  setExchangeRate(data.rates[firstCurrency])
})
},[])
function handleFromAmountChange(e) {
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
}
function handleToAmountChange(e) {
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
}

useEffect(() => {
  if (fromCurrency != null && toCurrency != null) {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
  }
}, [fromCurrency, toCurrency])

  return (
    <div >
      <h1>Converter</h1>
      <CurrencyRow
      currencyOption={currencyOption}
      selectCurrency={fromCurrency}
      onChangeCurrency={e => setFromCurrency(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
      currencyOption={currencyOption}
      selectCurrency={toCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      onChangeAmount={handleToAmountChange}
      amount={toAmount}
      />
    </div>
  );
}

export default App;
