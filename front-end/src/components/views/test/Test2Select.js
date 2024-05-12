import { useEffect, useRef, useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;
const SelectWrapper = styled.div`
    width: 21rem;
    height: 7rem;
    background-color: white;
    border: 1px solid black;
    border-radius: 1rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    &:hover {
        cursor: pointer;
    }
`;
const InputWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const Input = styled.input`
    width: 90%;
    height: 90%;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    padding-left: 1rem;
    &:hover {
        cursor: pointer;
    }
    &:input:focus {
        border: none;
        outline: none;
    }
`;
const OptionWrapper = styled.div`
    width: 100%;
    min-height: 7rem;
    max-height: 30rem;
    background-color: white;
    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 1rem;
    position: absolute;
    top: 100%;
    left: 0;
    display: ${(props) => (props.$isOn ? 'block' : 'none')};
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none; /* 스크롤바 숨김 */
    }
`;
const Option = styled.div`
    width: 100%;
    height: 7rem;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    &:hover {
        background-color: #eee;
    }
`;
export default function Test2Select() {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const inputRef = useRef(null);
    const optionRef = useRef(null);
    const [isOn, setIsOn] = useState(false);

    const handleOptionOpen = () => {
        setIsOn(!isOn);
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (optionRef.current && !optionRef.current.contains(event.target)) {
                setIsOn(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [optionRef]);
    const optionClick = (option) => {
        inputRef.current.value = option;
        setIsOn(false);
    };

    return (
        <Wrapper>
            <SelectWrapper>
                <InputWrapper onClick={handleOptionOpen}>
                    <Input
                        defaultValue={1}
                        ref={inputRef}
                        readOnly
                    ></Input>
                </InputWrapper>
                <OptionWrapper ref={optionRef} $isOn={isOn}>
                    {
                        options.map((option, i) =>
                            <Option
                                key={i}
                                onClick={() => optionClick(option)}
                            >{option}</Option>
                        )
                    }
                </OptionWrapper>
            </SelectWrapper>
        </Wrapper>
    )
}