import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const HideInput = styled.input`
    display: none;
`;
const ChkBoxImg = styled.img`
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
    &:hover {
        cursor: pointer;
    }
`;

export default function CheckBoxWrapper02({
    index,
    id,
    name,
    checkInfo,
    handleEachCheckBox,
}) {
    const isChecked = checkInfo?.isChecked;

    return (
        <Wrapper>
            {
                isChecked ?
                    <ChkBoxImg
                        src="/image/checkbox-checked.svg"
                        draggable="false"
                        onClick={() => handleEachCheckBox(index)}
                    ></ChkBoxImg> :
                    <ChkBoxImg
                        src="/image/checkbox-unchecked.svg"
                        draggable="false"
                        onClick={() => handleEachCheckBox(index)}
                    ></ChkBoxImg>
            }
            <HideInput
                id={id}
                name={name}
                checked={checkInfo?.isChecked}
                onChange={() => handleEachCheckBox(index)}
            ></HideInput>
        </Wrapper>
    )
}