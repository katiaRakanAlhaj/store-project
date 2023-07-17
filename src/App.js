import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './components/Login';
import CreateAdvertisement from './components/advertisment';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/createAdvertisement"
            element={<CreateAdvertisement />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
