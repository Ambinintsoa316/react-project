import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateUser from './components/CreateUser';
import ListUser from './components/ListUser';
import EditUser from './components/EditUser';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <nav className="text-center">
        <ul>
          <li>
          <Link to="/" className="text-decoration-none">List Users</Link>
          </li>
          <li>
          <Link to="user/create" className="text-decoration-none">Create Users</Link>
          </li>
        </ul>
      </nav> */}
      <header/>
      <Routes>
        <Route index element={<ListUser/>}/>
        <Route path='user/create' element={<CreateUser/>}/>
        <Route path='user/:id/edit' element={<EditUser/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
 
}

export default App;
 