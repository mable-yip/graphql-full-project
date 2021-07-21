import styled from 'styled-components'

export const ButtonLabel = styled.label<{color: string}>`
    color: ${(props) => props.color};
    font-size: 17px;
    padding-left: 5px;
    padding-top: 3px;
    padding-bottom: 5px;
    padding-right: 5px;
    cursor: pointer;
`

export const Button = styled.button<{bgColor: string, hoveredBgColor: string, borderColor: string, hoveredLabelColor: string}>`
    width: auto;
    height: 35px;
    background-color: ${(props) => props.bgColor};
    border-radius: 4px;
    cursor: pointer;
    border-color: ${(props) => props.borderColor};

    &:hover {
        background-color: ${(props) => props.hoveredBgColor};
        & label {
            color: ${(props) => props.hoveredLabelColor};
        }
    }
`