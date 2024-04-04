import React from "react";
import { ApiTable, code } from "../storybook-common/api-table";
import { ApiTableSectionProps } from "../storybook-common/api-table/types";

const DATA: ApiTableSectionProps[] = [
    {
        attributes: [
            {
                name: "items",
                mandatory: true,
                description: "The items to be displayed",
                propTypes: ["TimelineItemProps[]"],
            },
            {
                name: "title",
                description: (
                    <>
                        The text title of the <code>Timeline</code>
                    </>
                ),
                propTypes: ["string"],
            },
            {
                name: "className",
                description: "The class selector of the component",
                propTypes: ["string"],
            },
            {
                name: "startCol",
                description:
                    "The column at which the items should start at (Useful if component is wrapped in a css grid div)",
                propTypes: ["number"],
            },
            {
                name: "colSpan",
                description:
                    "The number of columns that the component should span (Useful if component is wrapped in a css grid div)",
                propTypes: ["number"],
            },
            {
                name: "data-testid",
                description: "The test identifier of the component",
                propTypes: ["string"],
            },
            {
                name: "data-base-indicator-testid",
                description:
                    "The test identifier of the component's indicators",
                propTypes: ["string"],
            },
        ],
    },
    {
        name: "TimelineItemProps",
        attributes: [
            {
                name: "title",
                mandatory: true,
                description: "The title of the item",
                propTypes: ["string"],
            },
            {
                name: "content",
                mandatory: true,
                description:
                    "The content of the item. Formatting within the content is to be handled",
                propTypes: ["JSX.Element"],
            },
            {
                name: "statuses",
                description: (
                    <>
                        The status pills to be rendered.&nbsp;
                        <strong>
                            Note that only a maximum of 2 pills will be rendered
                        </strong>
                        &nbsp; regardless how many statuses are specified
                    </>
                ),
                propTypes: ["PillProps[]"],
            },
            {
                name: "variant",
                description: (
                    <>
                        The style variant of the item indicator
                        <br />
                        <b>Note:</b> the first item defaults to{" "}
                        <code>current</code>, and subsequent items default to{" "}
                        <code>upcoming-active</code>
                    </>
                ),
                propTypes: [
                    `"completed"`,
                    `"current"`,
                    `"upcoming-active`,
                    `"upcoming-inactive"`,
                    `"error"`,
                ],
            },
        ],
    },
    {
        name: "PillProps",
        attributes: [
            {
                name: "",
                description: (
                    <>
                        This component also inherits props from&nbsp;
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement"
                            rel="noreferrer"
                            target="_blank"
                        >
                            HTMLDivAttributes
                        </a>
                    </>
                ),
            },
            {
                name: "type",
                mandatory: true,
                description: (
                    <>
                        The type style of the&nbsp;
                        <a
                            href="https://designsystem.life.gov.sg/react/index.html?path=/docs/modules-pill--docs"
                            rel="noreferrer"
                            target="_blank"
                        >
                            {code("Pill")}. <br />
                        </a>
                    </>
                ),
                propTypes: [`"solid"`, `"outline"`],
            },
            {
                name: "colorType",
                description: (
                    <>
                        The color style of the&nbsp;
                        <a
                            href="https://designsystem.life.gov.sg/react/index.html?path=/docs/modules-pill--docs"
                            rel="noreferrer"
                            target="_blank"
                        >
                            {code("Pill")}. <br />
                        </a>
                    </>
                ),
                propTypes: [
                    `"black"`,
                    `"grey"`,
                    `"green"`,
                    `"yellow"`,
                    `"red"`,
                    `"blue"`,
                ],
                defaultValue: `"black"`,
            },
            {
                name: "icon",
                description: "A component to be displayed as the icon",
                propTypes: ["JSX.Element"],
            },
        ],
    },
];

export const PropsTable = () => <ApiTable sections={DATA} />;
