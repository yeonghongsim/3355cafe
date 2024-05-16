// import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/views/home/HomePage';
import SignUpPage from './components/views/signup/SignUpPage';
import LoginPage from './components/views/login/LoginPage';
import Test1 from './components/views/test/Test1';
import Test2Select from './components/views/test/Test2Select';
import Test3If from './components/views/test/Test3If';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path='/' element={< HomePage />}></Route>
        <Route path='/signUp' element={< SignUpPage />}></Route>
        <Route path='/login' element={< LoginPage />}></Route>
        <Route path='/test1' element={< Test1 />}></Route>
        <Route path='/test2' element={< Test2Select />}></Route>
        <Route path='/test3' element={< Test3If />}></Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
