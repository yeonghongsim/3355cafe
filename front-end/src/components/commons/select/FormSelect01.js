import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SelectWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border: 0.1rem solid ${(props) => (props.$isOnErr ? "red" : "#d9d9d9")};
    border-radius: 0.5rem;
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
    padding-left: 0.5rem;
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
    max-height: 19rem;
    background-color: white;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 0.5rem;
    position: absolute;
    top: 100%;
    left: 0;
    display: ${(props) => (props.$isOn ? 'block' : 'none')};
    overflow: scroll;
    z-index: 2;
    &::-webkit-scrollbar {
        display: none; /* 스크롤바 숨김 */
    }
`;
const Option = styled.div`
    width: 100%;
    height: 3.5rem;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 0.5rem;
    &:hover {
        background-color: #eee;
    }
`;
const OptionText = styled.p`
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: darkgray;
`;

export default function FormSelect01({
    id
    , name
    , type
    , forwardRef
    , isOnErr
}) {
    const selectRef = useRef(null);
    const [isOn, setIsOn] = useState(false);

    const handleOptionOpen = () => {
        setIsOn(!isOn);
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOn(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectRef]);
    const optionClick = (option) => {
        // forwaredRef의 value를 option으로 변경하기.
        setIsOn(false);
        forwardRef.current.value = option;
    };
    let options = [];
    // test area
    if (id === 'day') {
        // console.log('day')
        let imsiOptions = [];
        for (let i = 1; 31 >= i; i++) {
            imsiOptions.push(i);
        }
        options = imsiOptions;
    }
    if (id === 'month') {
        // console.log('month')
        let imsiOptions = [];
        for (let i = 1; 12 >= i; i++) {
            imsiOptions.push(i);
        }
        options = imsiOptions;
    }
    if (id === 'year') {
        // console.log('year')
        const year = new Date().getFullYear();
        let imsiOptions = [];
        for (let i = year; i >= year - 130; i--) {
            imsiOptions.push(i);
        }
        options = imsiOptions;
    }

    return (
        <SelectWrapper $isOnErr={isOnErr} ref={selectRef}>
            <InputWrapper onClick={handleOptionOpen}>
                <Input
                    id={id}
                    name={name}
                    type={type}
                    ref={forwardRef}
                    placeholder="click."
                    readOnly
                    defaultValue={null}
                ></Input>
            </InputWrapper>
            <OptionWrapper $isOn={isOn}>
                {
                    options.map((option, i) =>
                        <Option
                            key={i}
                            onClick={() => optionClick(option)}
                        >
                            <OptionText>
                                {option}
                            </OptionText>
                        </Option>
                    )
                }
            </OptionWrapper>
        </SelectWrapper>
    )
}