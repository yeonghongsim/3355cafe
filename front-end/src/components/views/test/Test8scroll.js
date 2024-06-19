import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ScrollContainer = styled.div`
    width: 40rem;
    height: 60rem;
    border: 1px solid black;
    box-sizing: border-box;
    displyay: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
`;
const ScrollWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    flex: 1;
    scroll-behavior: smooth;
`;
const Scroll1 = styled.div`
    width: 100%;
    height: 40rem;
    background-color: #eee;
`;
const Scroll2 = styled.div`
    width: 100%;
    height: 40rem;
    background-color: #d9d9d9;
`;
const Scroll3 = styled.div`
    width: 100%;
    height: 40rem;
    background-color: darkgrey;
`;

export default function Test8scroll() {
    return (
        <Wrapper>
            <ScrollContainer>
                <ScrollWrapper>
                    <Scroll1></Scroll1>
                    <Scroll2></Scroll2>
                    <Scroll3></Scroll3>
                </ScrollWrapper>
            </ScrollContainer>
        </Wrapper>
    )
}