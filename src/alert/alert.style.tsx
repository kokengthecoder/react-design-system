import styled, { css } from "styled-components";
import { Color } from "../color/color";
import { Text, TextStyleHelper } from "../text";
import { AlertSizeType, AlertType } from "./types";

// =============================================================================
// STYLE INTERFACES, transient props are denoted with $
// See more https://styled-components.com/docs/api#transient-props
// =============================================================================
interface StyleProps {
    $type: AlertType;
    $sizeType: AlertSizeType;
}

// =============================================================================
// STYLING
// =============================================================================

export const Wrapper = styled.div<StyleProps>`
    padding: 0.5rem 1rem 0.5rem 0.875rem;
    display: flex;
    ${TextStyleHelper.getTextStyle("BodySmall", "regular")}
    color: ${Color.Neutral[1]};

    ${(props) => {
        let backgroundColor: string;
        let borderColor: string;
        switch (props.$type) {
            case "error":
                backgroundColor = Color.Validation.Red.Background(props);
                borderColor = Color.Validation.Red.Border(props);
                break;
            case "success":
                backgroundColor = Color.Validation.Green.Background(props);
                borderColor = Color.Validation.Green.Border(props);
                break;
            case "warning":
                backgroundColor = Color.Validation.Orange.Background(props);
                borderColor = Color.Validation.Orange.Border(props);
                break;
            case "info":
                backgroundColor = Color.Validation.Blue.Background(props);
                borderColor = Color.Validation.Blue.Border(props);
                break;
            case "description":
                backgroundColor = Color.Neutral[7](props);
                borderColor = Color.Neutral[4](props);
                break;
            default:
                backgroundColor = Color.Validation.Orange.Background(props);
                borderColor = Color.Validation.Orange.Border(props);
                break;
        }

        return css`
            background: ${backgroundColor};
            border-left: 2px solid ${borderColor};
        `;
    }}

    p {
        margin: 0;
        ${(props) => {
            if (props.$sizeType === "small")
                return css`
                    ${TextStyleHelper.getTextStyle("H6", "regular")}

                    strong {
                        ${TextStyleHelper.getTextStyle("H6", "semibold")}
                    }

                    a {
                        ${TextStyleHelper.getTextStyle("H6", "semibold")}
                    }
                `;
            else {
                return css`
                    ${TextStyleHelper.getTextStyle("H5", "regular")}

                    strong {
                        ${TextStyleHelper.getTextStyle("H5", "semibold")}
                    }

                    a {
                        ${TextStyleHelper.getTextStyle("H5", "semibold")}
                    }
                `;
            }
        }}

        a {
            color: ${Color.Primary};
            text-decoration: none;

            :hover,
            :active,
            :focus {
                color: ${Color.Secondary};
            }
        }
    }
`;

export const AlertIconWrapper = styled.div<StyleProps>`
    margin-right: 0.5rem;

    // adds extra spacing to align the small icon with text
    ${(props) =>
        props.$sizeType === "small" &&
        css`
            display: flex;
            align-items: center;
            height: 1.625rem;
        `}

    ${(props) => {
        let iconColor: string;
        const iconSize = props.$sizeType === "small" ? "1.25rem" : "1.5rem";
        switch (props.$type) {
            case "error":
                iconColor = Color.Validation.Red.Icon(props);
                break;
            case "success":
                iconColor = Color.Validation.Green.Icon(props);
                break;
            case "warning":
                iconColor = Color.Validation.Orange.Icon(props);
                break;
            case "info":
                iconColor = Color.Validation.Blue.Icon(props);
                break;
            case "description":
                iconColor = Color.Neutral[4](props);
                break;
            default:
                iconColor = Color.Validation.Orange.Icon(props);
                break;
        }

        return css`
            svg {
                color: ${iconColor};
                width: ${iconSize};
                height: ${iconSize};
            }
        `;
    }}
`;

export const ActionLinkText = styled(Text.Hyperlink.Small)<StyleProps>`
    ${(props) => {
        if (props.$sizeType === "small")
            return css`
                ${TextStyleHelper.getTextStyle("H6", "semibold")}
                margin-top: 0.25rem;
            `;
        else {
            return css`
                ${TextStyleHelper.getTextStyle("H5", "semibold")}
                margin-top: 0.5rem;
            `;
        }
    }}
    display: flex;
    align-items: center;
    color: ${Color.Primary};

    svg {
        height: 1rem;
        width: 1rem;
        margin-left: 0.25rem;
        color: ${Color.Primary};
    }
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-wrap: anywhere;
`;
