import styled from "styled-components"
import LOGO from "../../../commons/logo/LOGO";
import { useRef, useState } from "react";
import { COLORS } from "../../../../commons/styles/COLORS";
import RegiBoardSelect01 from "../../../commons/select/RegiBoardSelect01";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const SmallWrapper = styled.div`
    width: 75%;
    height: 100%;
    margin: 0 auto;
`;
const HeaderSection = styled.section`
    width: 100%;
    height: 12vh;
    border-bottom: 0.1rem solid black;
    box-sizing: border-box;
`;
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const BodySection = styled.section`
    width: 100%;
    margin-top: 1rem;
`;
const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
    padding: 1rem;
    gap: 0.5rem;
    box-sizing: border-box;
`;
const Layer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const TypeNTitleContainer = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    box-sizing: border-box;
`;
const BoardTypeContainer = styled.div`
    width: 10rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BoardTitleContainer = styled.div`
    width: calc(100% - 10rem);
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const TitleTextContainer = styled.div`
    width: 5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 0.1rem solid black;
    border-right: 0.1rem solid black;
    box-sizing: border-box;
`;
const TitleText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    color: black;
`;
const TitleInputContainer = styled.div`
    width: calc(100% - 5rem);
    height: 100%;
`;
const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    &:input:focus {
        border: none;
        outline: none;
    }
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 4rem;
    // background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const RegiBtn = styled.div`
    width: 12rem;
    height: 4rem;
    background-color: ${COLORS.blueColor};
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;

export default function RegisterBoardPage() {
    // select board type ref
    const boardTypeRef = useRef(null);
    // input title ref
    const titleInputRef = useRef(null);
    // input value length control
    const [inputValue, setInputValue] = useState("");
    // input change handler to limit length
    const handleInputChange = (e) => {
        if (e.target.value.length <= 45) {
            setInputValue(e.target.value);
        }
    };
    // resi btn click
    const handleRegiBtnClick = () => {
        const data = {
            boardType: boardTypeRef.current.value,
            boardTitle: inputValue,
        }
        console.log(data);
    };

    return (
        <Wrapper>
            <HeaderSection>
                <SmallWrapper>
                    <HeaderContainer>
                        <LOGO></LOGO>
                    </HeaderContainer>
                </SmallWrapper>
            </HeaderSection>
            <BodySection>
                <SmallWrapper>
                    <Form>
                        <Layer>
                            <TypeNTitleContainer>
                                <BoardTypeContainer>
                                    <RegiBoardSelect01
                                        forwardRef={boardTypeRef}
                                    ></RegiBoardSelect01>
                                </BoardTypeContainer>
                                <BoardTitleContainer>
                                    <TitleTextContainer>
                                        <TitleText>제목</TitleText>
                                    </TitleTextContainer>
                                    <TitleInputContainer>
                                        <Input
                                            ref={titleInputRef}
                                            placeholder="45자 이내로 작성해주세요."
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        ></Input>
                                    </TitleInputContainer>
                                </BoardTitleContainer>
                            </TypeNTitleContainer>
                        </Layer>
                        <Layer>내용 / 길이 1000자 이내</Layer>
                        <Layer>이미지 / 리스트 형식</Layer>
                        <Layer>
                            <BtnContainer>
                                <RegiBtn onClick={handleRegiBtnClick}>
                                    등록 하기
                                </RegiBtn>
                            </BtnContainer>
                        </Layer>
                    </Form>
                </SmallWrapper>
            </BodySection>
        </Wrapper>
    )
}