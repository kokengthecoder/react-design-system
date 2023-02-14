import { SimpleInterpolation, css } from "styled-components";

export type CssValue = SimpleInterpolation | ReturnType<typeof css>;

export interface DesignTokenSet {
    InputBoxShadow: CssValue;
    InputErrorBoxShadow: CssValue;
}

export type DesignTokenSetOptions = Partial<DesignTokenSet>;