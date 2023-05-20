import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { StringHelper } from "../util";
import {
    DayInput,
    Divider,
    InputContainer,
    InputSection,
    MonthInput,
    Placeholder,
    YearInput,
} from "./standalone-date-input.style";

dayjs.extend(customParseFormat);

type StartInputNames = ["start-day", "start-month", "start-year"];
type EndInputNames = ["end-day", "end-month", "end-year"];

export type FieldType =
    | StartInputNames[number]
    | EndInputNames[number]
    | "none";

interface Props {
    disabled?: boolean | undefined;
    readOnly?: boolean | undefined;
    names: StartInputNames | EndInputNames;
    value: string | undefined;
    fromHover: boolean;
    focused: boolean;
    placeholder?: string | undefined;
    label?: string | undefined;
    onChange: (value: string) => void;
    onFocus: () => void;
    onBlur: (valid: boolean) => void;
}

export interface StandaloneDateInputRef {
    ref: React.Ref<HTMLDivElement>;
    resetPlaceholder: () => void;
    resetInput: () => void;
}

export const Component = (
    {
        disabled,
        readOnly,
        names,
        value,
        focused,
        fromHover,
        placeholder,
        label,
        onChange,
        onFocus,
        onBlur,
    }: Props,
    ref: React.ForwardedRef<StandaloneDateInputRef>
) => {
    // =============================================================================
    // CONST, STATE, REF
    // =============================================================================
    const [dayValue, setDayValue] = useState<string>("");
    const [monthValue, setMonthValue] = useState<string>("");
    const [yearValue, setYearValue] = useState<string>("");
    const [currentFocus, setCurrentFocus] = useState<FieldType>("none");
    const [hidePlaceholder, setHidePlaceholder] = useState<boolean>(false);

    const nodeRef = useRef<HTMLDivElement>(null);
    const dayInputRef = useRef<HTMLInputElement>(null);
    const monthInputRef = useRef<HTMLInputElement>(null);
    const yearInputRef = useRef<HTMLInputElement>(null);

    // =============================================================================
    // EFFECTS
    // =============================================================================
    useEffect(() => {
        if (!value) {
            setDayValue("");
            setMonthValue("");
            setYearValue("");
        } else {
            const day = dayjs(value, "YYYY-MM-DD");

            setDayValue(StringHelper.padValue(day.date().toString()));
            setMonthValue(StringHelper.padValue((day.month() + 1).toString()));
            setYearValue(day.year().toString());
        }
    }, [value]);

    useEffect(() => {
        // clear internal focus state
        if (!focused) {
            setCurrentFocus("none");
        }

        // ensure at least one input is focused
        if (focused) {
            setHidePlaceholder(true);

            if (!nodeRef.current.contains(document.activeElement)) {
                dayInputRef.current.focus();
            }
        }
    }, [focused]);

    useImperativeHandle(
        ref,
        () => ({
            ref: nodeRef,
            resetPlaceholder() {
                setHidePlaceholder(false);
            },
            resetInput() {
                if (!value) {
                    setDayValue("");
                    setMonthValue("");
                    setYearValue("");
                } else {
                    const day = dayjs(value, "YYYY-MM-DD");

                    setDayValue(StringHelper.padValue(day.date().toString()));
                    setMonthValue(
                        StringHelper.padValue((day.month() + 1).toString())
                    );
                    setYearValue(day.year().toString());
                }
            },
        }),
        [value]
    );

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleSectionClick = () => {
        setHidePlaceholder(true);

        if (!nodeRef.current.contains(document.activeElement)) {
            dayInputRef.current.focus();
        }
    };

    const handleSectionFocus = () => {
        setHidePlaceholder(true);
        onFocus();
    };

    const handleSectionBlur = (event: React.FocusEvent) => {
        if (!nodeRef.current.contains(event.relatedTarget)) {
            setCurrentFocus("none");

            const value = `${yearValue}-${monthValue}-${dayValue}`;
            const isValid = dayjs(value, "YYYY-MM-DD", true).isValid();

            onBlur(isValid);
        }
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
        const targetName = event.target.name as FieldType;
        setCurrentFocus(targetName);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const targetName = event.target.name as FieldType;
        const targetValue = StringHelper.padValue(event.target.value, true);

        const date = {
            day: dayValue,
            month: monthValue,
            year: yearValue,
        };

        if (targetValue === event.target.value) {
            // nothing actually changed
            return;
        }

        switch (targetName) {
            case names[0]:
                date.day = targetValue;
                setDayValue(targetValue);
                break;
            case names[1]:
                date.month = targetValue;
                setMonthValue(targetValue);
                break;
            case names[2]:
            default:
                break;
        }

        const value = `${date.year}-${date.month}-${date.day}`;
        const isValid = dayjs(value, "YYYY-MM-DD", true).isValid();

        if (isValid) {
            onChange(value);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = event.target.name as FieldType;
        const targetValue = event.target.value.replace(/[^0-9]/g, "");

        const date = {
            day: dayValue,
            month: monthValue,
            year: yearValue,
        };

        switch (targetName) {
            case names[0]:
                date.day = targetValue;
                setDayValue(targetValue);
                // auto focus the next input once filled in
                if (targetValue.length === 2) {
                    monthInputRef.current.focus();
                }
                break;
            case names[1]:
                date.month = targetValue;
                setMonthValue(targetValue);
                // auto focus the next input once filled in
                if (targetValue.length === 2) {
                    yearInputRef.current.focus();
                }
                break;
            case names[2]:
                date.year = targetValue;
                setYearValue(targetValue);
                break;
            default:
                break;
        }

        if (!date.day && !date.month && !date.year) {
            onChange("");
            return;
        }

        const value = `${date.year}-${date.month}-${date.day}`;
        const isValid = dayjs(value, "YYYY-MM-DD", true).isValid();

        if (isValid) {
            onChange(value);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        /**
         * Allow going to the field before if user presses Backspace
         * on an empty field
         */
        if (event.code === "Backspace" || event.key === "Backspace") {
            if (currentFocus === names[1] && monthValue.length === 0) {
                dayInputRef.current.focus();
            }

            if (currentFocus === names[2] && yearValue.length === 0) {
                monthInputRef.current.focus();
            }
        }
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderPlaceholder = () => {
        if (value || readOnly || !placeholder) {
            return;
        }

        return (
            <Placeholder $hide={hidePlaceholder} $disabled={disabled}>
                {placeholder}
            </Placeholder>
        );
    };

    return (
        <InputSection
            role="group"
            aria-label={label}
            onClick={handleSectionClick}
            onFocus={handleSectionFocus}
            onBlur={handleSectionBlur}
        >
            <InputContainer ref={nodeRef} $hover={fromHover}>
                <DayInput
                    ref={dayInputRef}
                    name={names[0]}
                    maxLength={2}
                    value={dayValue}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{2}"
                    data-testid={`${names[0]}-input`}
                    aria-label="day"
                    disabled={disabled}
                    readOnly={readOnly}
                    tabIndex={readOnly ? -1 : 0}
                    autoComplete="off"
                    placeholder={
                        currentFocus === names[0] && !readOnly ? "" : "DD"
                    }
                />
                <Divider $inactive={dayValue.length === 0}>/</Divider>
                <MonthInput
                    ref={monthInputRef}
                    name={names[1]}
                    maxLength={2}
                    value={monthValue}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{2}"
                    data-testid={`${names[1]}-input`}
                    aria-label="month"
                    disabled={disabled}
                    readOnly={readOnly}
                    tabIndex={readOnly ? -1 : 0}
                    autoComplete="off"
                    placeholder={
                        currentFocus === names[1] && !readOnly ? "" : "MM"
                    }
                />
                <Divider $inactive={monthValue.length === 0}>/</Divider>
                <YearInput
                    ref={yearInputRef}
                    name={names[2]}
                    maxLength={4}
                    value={yearValue}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    data-testid={`${names[2]}-input`}
                    aria-label="year"
                    disabled={disabled}
                    readOnly={readOnly}
                    tabIndex={readOnly ? -1 : 0}
                    autoComplete="off"
                    placeholder={
                        currentFocus === names[2] && !readOnly ? "" : "YYYY"
                    }
                />
            </InputContainer>
            {renderPlaceholder()}
        </InputSection>
    );
};

export const StandaloneDateInput = React.forwardRef(Component);
