import React from "react";
import { ButtonRef } from "../button/types";
import { Main } from "./image-button.style";
import { ImageButtonProps } from "./types";
import { ImageWithFallback } from "../shared/image-with-fallback/image-with-fallback";

const Component = (
    { children, imgSrc, ...otherProps }: ImageButtonProps,
    ref: ButtonRef
) => {
    return (
        <Main ref={ref} {...otherProps}>
            <ImageWithFallback imgSrc={imgSrc} />
            {children}
        </Main>
    );
};

export const ImageButton = React.forwardRef(Component);