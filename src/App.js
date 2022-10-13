
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './views/Auth';
import Home from './views/Home';
import Admin from './views/Admin';
import Error from './views/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth views */}
        <Route path='login' element={<Auth authRoute="login"/>}/>
        <Route path='register' element={<Auth authRoute="register"/>}/>
        {/* home views */}
        <Route path='dashboard' element={<Home homeRoute="dashboard"/>} />
        <Route path='blog' element={<Home homeRoute="blog"/>} />
        {/* admin views */}
        <Route path='admin' element={<Admin adminRoute="dashboard"/>}/>
        <Route path='admin/category' element={<Admin adminRoute="category"/>} />
        <Route path='admin/post' element={<Admin adminRoute="post"/>} />
        {/* error views */}
        <Route path='forbidden' element={<Error errorRoute="forbidden"/>} />
        {/* exception views */}
        <Route path="*" element={<Home homeRoute="dashboard"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
