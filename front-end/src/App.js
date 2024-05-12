// import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/views/home/HomePage';
import SignUpPage from './components/views/signup/SignUpPage';
import Test1 from './components/views/test/Test1';
import Test2Select from './components/views/test/Test2Select';

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
        <Route path='/test1' element={< Test1 />}></Route>
        <Route path='/test2' element={< Test2Select />}></Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
