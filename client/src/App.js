import { useSelector } from 'react-redux';
import TickerList from './components/TickerList/TickerList'
import Loader from './components/UI/Loader';
import { useGetTickersQuery } from './redux/services/tickersApi'

function App() {
  const { data, error, isLoading } = useGetTickersQuery()
  const tickers = data;
  const { subscribeTickers } = useSelector(state => state.tickers)

  if (error) return <div>Oh no, there was an error</div>

  if (isLoading) return <Loader />

  return (
    <div className="flex flex-wrap">
      <TickerList title="All tickers" tickers={tickers} />
      <TickerList
        title="subsciptions"
        tickers={tickers.filter(item1 => subscribeTickers.some(item2 => item1.ticker === item2.ticker)) }
        isSubscriptions
      />
    </div>
  );
}

export default App;
