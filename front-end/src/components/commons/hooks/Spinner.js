import styled, { keyframes } from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 15rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;
// 회전 애니메이션 생성
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Loading = styled.img`
    width: 5rem;
    height: 5rem;
    flex-shrink: 0;
    /* 회전 애니메이션 적용 */
    animation: ${rotateAnimation} 2s linear infinite;
`;

export default function Spinner() {
  return (
    <Wrapper>
      <Loading src="/image/icon_loading.svg"></Loading>
    </Wrapper>
  )
}