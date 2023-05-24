import React from "react";
import { ApiTable } from "../storybook-common/api-table";
import { ApiTableSectionProps } from "../storybook-common/api-table/types";

const DATA: ApiTableSectionProps[] = [
    {
        name: "TimeSlotWeekView specific props",
        attributes: [
            {
                name: "minDate",
                description: (
                    <>
                        Restrict selection to this above this date. To specify
                        in the format <code>YYYY-MM-DD</code>
                    </>
                ),
                propTypes: ["string"],
            },
            {
                name: "maxDate",
                description: (
                    <>
                        Restrict selection to this above this date. To specify
                        in the format <code>YYYY-MM-DD</code>
                    </>
                ),
                propTypes: ["string"],
            },
            {
                name: "className",
                description: "Class selector for the component",
                propTypes: ["string"],
            },
            {
                name: "data-testid",
                description: "The test identifier for the component",
                propTypes: ["string"],
            },
            {
                name: "disabledDates",
                description: (
                    <>
                        The dates to be disabled. To specify each date in the
                        format <code>YYYY-MM-DD</code>
                    </>
                ),
                propTypes: ["string[]"],
            },
            {
                name: "id",
                description: "The unique identifier for the component",
                propTypes: ["string"],
            },
            {
                name: "value",
                description: (
                    <>
                        The value of the selected date in&nbsp;
                        <code>YYYY-MM-DD</code> format
                    </>
                ),
                propTypes: ["string"],
            },
            {
                name: "onYearMonthDisplayChange",
                description:
                    "Called when there is a change in the current visible month and year",
                propTypes: ["(value: YearMonthDisplay) => void"],
            },
            {
                name: "onHover",
                description: (
                    <>
                        Called with the current hovered date or empty string if
                        the user leaves the calendar day view. Returns value
                        in&nbsp;
                        <code>YYYY-MM-DD</code>&nbsp;format.
                    </>
                ),
                propTypes: ["(value: string) => void"],
            },
            {
                name: "onChange",
                description: (
                    <>
                        Called when the user selected a value from the calendar.
                        Returns value in&nbsp;
                        <code>YYYY-MM-DD</code>&nbsp;format. Should the value be
                        invalid, the&nbsp; &lsquo;Invalid Date&rsquo; value will
                        be returned
                    </>
                ),
                propTypes: ["(value: string) => void"],
            },
        ],
    },
    {
        name: "YearMonthDisplay",
        attributes: [
            {
                name: "year",
                description: (
                    <>
                        The current visible year in <code>YYYY</code> format
                    </>
                ),
                propTypes: ["number"],
            },
            {
                name: "month",
                description: "The current visible month, from 1 to 12",
                propTypes: ["number"],
            },
        ],
    },
];

export const PropsTable = () => <ApiTable sections={DATA} />;
