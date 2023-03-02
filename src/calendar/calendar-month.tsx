import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { CalendarHelper } from "src/util/calendar-helper";
import { CellLabel, MonthCell, Wrapper } from "./calendar-month.style";
import { CalendarType } from "./types";

export type MonthVariant = "default" | "current-month" | "selected-month";

interface Props {
    calendarDate: Dayjs;
    selectedStartDate: string;
    type: CalendarType;
    onSelect: (value: Dayjs) => void;
}

export const CalendarMonth = ({
    calendarDate,
    selectedStartDate,
    type,
    onSelect,
}: Props) => {
    // =============================================================================
    // CONST, STATE, REF
    // =============================================================================
    const [months, setMonths] = useState<Dayjs[]>([]);

    // =============================================================================
    // EFFECTS
    // =============================================================================
    useEffect(() => {
        generateMonths();
    }, [calendarDate]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleMonthClick = (value: Dayjs) => {
        onSelect(value);
    };

    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    const generateMonthStatus = (date: Dayjs) => {
        const month = date.format("MMMM");
        const value = date.format("YYYY-MM-DD");
        let variant: MonthVariant = "default";

        variant = dayjs(selectedStartDate).isSame(value, "month")
            ? "selected-month"
            : dayjs().isSame(value, "month")
            ? "current-month"
            : "default";

        return {
            month,
            variant,
        };
    };

    const generateMonths = () => {
        const months = CalendarHelper.generateMonths(calendarDate);
        setMonths(months);
    };

    // =============================================================================
    // RENDER FUNCTION
    // =============================================================================
    if (!months.length) return null;

    return (
        <Wrapper $type={type}>
            {months.map((date) => {
                const { variant, month } = generateMonthStatus(date);
                return (
                    <MonthCell
                        key={month}
                        onClick={() => handleMonthClick(date)}
                        $variant={variant}
                    >
                        <CellLabel weight="regular" $variant={variant}>
                            {month}
                        </CellLabel>
                    </MonthCell>
                );
            })}
        </Wrapper>
    );
};