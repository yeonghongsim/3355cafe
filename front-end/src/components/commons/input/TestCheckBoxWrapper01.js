import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ToggleImg = styled.img`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    &:hover {
        cursor: pointer;
    }
`;
const HideInput = styled.input`
    display: none;
`;

export default function TestCheckBoxWrapper01({
    id,
    isCheckedAll,
    toggleAllCheckBox
}) {
    return (
        <Wrapper>
            {
                isCheckedAll ?
                    <ToggleImg
                        src="/image/checkbox-checked.svg"
                        draggable="false"
                        onClick={() => { toggleAllCheckBox() }}
                    ></ToggleImg> :
                    <ToggleImg
                        src="/image/checkbox-unchecked.svg"
                        draggable="false"
                        onClick={() => { toggleAllCheckBox() }}
                    ></ToggleImg>
            }
            <HideInput
                type="checkbox"
                id={id}
                name={id}
                checked={isCheckedAll}
                onChange={() => { toggleAllCheckBox() }}
            ></HideInput>
        </Wrapper>
    )
}