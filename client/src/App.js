import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home'
import MarvelDetailPage  from './components/MarvelDetailPage';
import useOnline from './utils/useOnline';
import Offline from './components/Offline';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { Provider } from 'react-redux';
import Store from './utils/Store';

function App() {

  const online=useOnline();

  if(!online)
  return <Offline/>

  return (
    <Provider store={Store}>
      <div className="App">
      <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marveldetailpage" element={<MarvelDetailPage/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
                {/* <Route path="/productPage" element={<ProductPage />} /> */}
                {/* <Route path="/paymentsuccess" element={<PaymentSuccess />} /> */}
            </Routes>
        </Router>
    </div>
    </Provider>
  );
}

export default App;
