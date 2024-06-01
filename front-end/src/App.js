// import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/views/home/HomePage';
import SignUpPage from './components/views/signup/SignUpPage';
import LoginPage from './components/views/login/LoginPage';
import BoardPage from './components/views/board/BoardPage';
import BoardBodyContainer from './components/views/board/BoardBodyContainer';
import BoardDetailPage from './components/views/boardDetail/BoardDetailPage';
import RegisterBoardPage from './components/views/register/board/RegisterBoardPage';
import Test1 from './components/views/test/Test1';
import Test2Select from './components/views/test/Test2Select';
import Test3If from './components/views/test/Test3If';
import Test4ImageSlide from './components/views/test/Test4ImageSlide';
import Test5Route from './components/views/test/Test5Route';
import Test501 from './components/views/test/Test501';
import Test502 from './components/views/test/Test502';
import Test503 from './components/views/test/Test503';
import Test6RegiBoard from './components/views/test/Test6RegiBoard';
import Test6GetBoardList from './components/views/test/Test6GetBoardList';
import Test6GetBoard from './components/views/test/Test6GetBoard';
import { useSelector } from 'react-redux';


const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  // get boardTypeList in store
  const boardTypeList = useSelector((state) => state.boardTypeList.boardTypeList);

  return (
    <Wrapper>
      <Routes>
        <Route path='/' element={< HomePage />}></Route>
        <Route path='/signUp' element={< SignUpPage />}></Route>
        <Route path='/login' element={< LoginPage />}></Route>
        <Route path='/board' element={< BoardPage />}>
          {
            boardTypeList.map((boardType, idx) => (
              <Route path={boardType.url} element={<BoardBodyContainer $location={boardType.url} />} key={idx} />
            ))
          }
          <Route path='search' element={<BoardBodyContainer $location='/board/search' />}></Route>
        </Route>
        <Route path='/boardDetail' element={< BoardDetailPage />}></Route>
        <Route path='/register'>
          <Route path='board' element={<RegisterBoardPage />}></Route>
        </Route>
        <Route path='/test1' element={< Test1 />}></Route>
        <Route path='/test2' element={< Test2Select />}></Route>
        <Route path='/test3' element={< Test3If />}></Route>
        <Route path='/test4' element={< Test4ImageSlide />}></Route>
        <Route path='/test5' element={< Test5Route />}>
          <Route path='1' element={<Test501 />} />
          <Route path='2' element={<Test502 />} />
          <Route path='3' element={<Test503 />} />
        </Route>
        <Route path='/test6'>
          <Route path='1' element={< Test6RegiBoard />}></Route>
          <Route path='2' element={< Test6GetBoardList />}></Route>
          <Route path='3' element={< Test6GetBoard />}></Route>
        </Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
