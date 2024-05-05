// import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/views/home/HomePage';
import Test1 from './components/views/test/Test1';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path='/' element={< HomePage />}></Route>
        <Route path='/test1' element={< Test1 />}></Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
