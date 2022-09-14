import styled, { css } from "styled-components";
import { StyleProps } from "./types";

const getBackdropFilter = (blur: boolean) => {
    let styleString = "";

    if (blur) {
        styleString += "blur(10px)";
    }

    return styleString.length > 0 ? styleString : "none";
};

export const Root = styled.div<StyleProps>`
    position: fixed;
    left: 0;
    top: 0;
    height: 0;
    width: 0;
    visibility: hidden;
    z-index: ${(props) => {
        return props.zIndex || (props.$stacked ? 99999 : 99998);
    }};

    ${(props) => {
        if (props.$show) {
            return css`
                height: 100%;
                width: 100vw;
                visibility: visible;
            `;
        }
    }}
`;

export const Wrapper = styled.div<StyleProps>`
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(5, 1, 1, ${(props) => props.$backgroundOpacity});
    backdrop-filter: ${(props) => getBackdropFilter(props.$backgroundBlur)};
    transition: opacity 200ms ease;

    ${(props) => {
        let customStyles = "";
        if (props.$show) {
            customStyles += css`
                visibility: visible;
                opacity: 1;
                pointer-events: auto;
                height: 100%;
                width: 100vw;
            `;
        } else {
            customStyles += css`
                visibility: hidden;
                opacity: 0;
                transition-delay: ${props.$disableTransition ? "0ms" : "400ms"};
                pointer-events: none;
                height: 0;
                width: 0;
            `;
        }
        if (props.$disableTransition) {
            customStyles += css`
                transition: none;
            `;
        }

        return customStyles;
    }}
`;
