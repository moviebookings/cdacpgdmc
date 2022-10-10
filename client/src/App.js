import ForgetPassword from "./pages/forgetPassword";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UpdateProfile from './pages/updateProfile';
import ViewProfile from './pages/viewProfile';
import WithoutNav from "./components/withoutNav";
import WithNav from "./components/withNav";
import DeleteAccount from "./pages/deleteAccount";
import Bookings from './pages/bookingList';
import Payments from "./pages/paymentsList";
import Footer from "./components/footer";
import DisplayShows from './pages/diplayShows';
import ShowMovieDetails from "./components/showMovieDetails";
import BookShow from "./pages/bookshow";
import Pay from "./pages/pay";
import AdminLogin from './pages/admin/adminlogin';

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Routes >
      <Route element={<WithoutNav/>}>
         <Route path="/" element={<Signin/>}/>
         <Route path="/forget-password" element={<ForgetPassword/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/admin/login" element={<AdminLogin/>}/>
      </Route>
        
        <Route element={<WithNav />}>
        <Route path="/home-page" element={<Home/>}/>
        <Route path="/update-profile" element={<UpdateProfile/>}/>
        <Route path="/view-profile" element={<ViewProfile/>}/>
        <Route path="/delete-account" element={<DeleteAccount/>}/>
        <Route path="/view-profile" element={<ViewProfile/>}/>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="/payments" element={<Payments/>}/>
        <Route path="/display-shows" element={<DisplayShows/>}/>
        <Route path="/movie-details" element={<ShowMovieDetails/>}/>
        <Route path="/book-show" element={<BookShow/>}/>
        <Route path="/pay" element={<Pay/>}/>
        
        
        </Route>
      </Routes>
      
      <ToastContainer/>
     
      </BrowserRouter>
      
      
      <Footer/>
      
    </div>
  );
}

export default App;
