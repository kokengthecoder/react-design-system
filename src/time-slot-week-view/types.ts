import { TimeSlot } from "../time-slot-bar/types";

export interface TimeSlotWeekViewProps {
    className?: string | undefined;
    "data-testid"?: string | undefined;
    id?: string | undefined;

    /** The value of the selected date in YYYY-MM-DD format */
    value?: string | undefined;
    /** The minimum allowed date to select in YYYY-MM-DD format **/
    minDate?: string | undefined;
    /** The maximum allowed date to select in YYYY-MM-DD format **/
    maxDate?: string | undefined;
    /** Time slots to render */
    slots?: { [date: string]: TimeSlot[] } | undefined;
    /**  Specifies if the month/year dropdown and navigation arrows should be displayed. */
    showNavigationHeader?: boolean | undefined;
    /** Specifies if date can be selected */
    enableSelection?: boolean | undefined;
    /** The initial date to be visible in the week view in YYYY-DD-MM format */
    currentCalendarDate?: string | undefined;
    /** Dates to disable in `YYYY-MM-DD` format. Example: `["2023-04-30"]` */
    disabledDates?: string[] | undefined;
    /** Called when user clicks on a time slot */
    onSlotClick?: ((date: string, timeSlot: TimeSlot) => void) | undefined;
    /** Called when user clicks on a date */
    onChange?: ((value: string) => void) | undefined;
    /** Called when the current visible week changes */
    onWeekDisplayChange?: ((value: YearMonthWeekDisplay) => void) | undefined;
}

interface YearMonthWeekDisplay {
    week: { firstDayOfWeek: string; lastDayOfWeek: string };
    year: number;
    month: number;
}
