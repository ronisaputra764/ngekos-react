import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Index from "./pages/Index";
import CheckBooking from './pages/CheckBooking';
import { boardingHouses, cities, categories } from './data';
import Categories from './pages/categories/Categories';
import Cities from './pages/cities/Cities';
import Details from './pages/details/Details';
import RoomAvailable from './pages/RoomAvailable';
import CustInfo from './pages/CustInfo';
import Checkout from './pages/CheckOut';
import BookingSuccess from './pages/booking-success/BokingSuccess';
import BookingDetails from './pages/BookingDetails';

function App() {

  const getCityNameById = (cityId) => {
    const city = cities.find((city) => city.id === cityId);
    return city ? city.name : "Unknown City";
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : "Unknown City";
  };

  const countBoardingHousesByCategory = boardingHouses.reduce((acc, boardingHouse) => {
    const categoryId = boardingHouse.category_id;
    acc[categoryId] = (acc[categoryId] || 0) + 1;
    return acc;
  }, {});

  const countBoardingHousesByCity = boardingHouses.reduce((acc, boardingHouse) => {
    const cityId = boardingHouse.city_id;
    acc[cityId] = (acc[cityId] || 0) + 1;
    return acc;
  }, {});

  const categoriesWithCount = categories.map(category => ({
    ...category,
    count: countBoardingHousesByCategory[category.id] || 0,
  }));

  const citiesWithCount = cities.map(city => ({
    ...city,
    count: countBoardingHousesByCity[city.id] || 0,
  }));

  function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={
            <Index
              boardingHouses={boardingHouses}
              cities={cities} categories={categories}
              categoriesWithCount={categoriesWithCount}
              citiesWithCount={citiesWithCount}
              formatRupiah={formatRupiah}
              getCategoryNameById={getCategoryNameById}
              getCityNameById={getCityNameById}
            />}
          />
          <Route path={"/check-booking"} element={<CheckBooking />}
          />
          <Route path={"/categories/:id"} element={
            <Categories
              boardingHouse={boardingHouses}
              categories={categories}
              formatRupiah={formatRupiah}
            />}
          />
          <Route path={"/cities/:id"} element={
            <Cities
              boardingHouse={boardingHouses}
              cities={cities}
              formatRupiah={formatRupiah}
            />}
          />
          <Route path={"/details/:id"} element={
            <Details
              boardingHouses={boardingHouses}
              formatRupiah={formatRupiah}
              getCategoryNameById={getCategoryNameById}
              getCityNameById={getCityNameById}
            />}
          />
          <Route path={"/room-available/:id"} element={
            <RoomAvailable
              boardingHouse={boardingHouses}
              formatRupiah={formatRupiah}
              getCategoryNameById={getCategoryNameById}
              getCityNameById={getCityNameById}
            />}
          />
          <Route path="/cust-info/:id" element={
            <CustInfo
              boardingHouse={boardingHouses}
              formatRupiah={formatRupiah}
              getCategoryNameById={getCategoryNameById}
              getCityNameById={getCityNameById}
            />}
          />
          <Route path='/checkout' element={<Checkout formatRupiah={formatRupiah} />} />
          <Route path='/booking-success' element={<BookingSuccess />} />
          <Route path='/booking-details' element={<BookingDetails formatRupiah={formatRupiah} />} />
        </Routes>
      </BrowserRouter>

    </>
  );
};

export default App;
