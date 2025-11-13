import React, { useState } from "react";
import SelectInput from "../SelectInput/SelectInput.jsx";

const persianMonths = [
    { value: "01", label: "فروردین" },
    { value: "02", label: "اردیبهشت" },
    { value: "03", label: "خرداد" },
    { value: "04", label: "تیر" },
    { value: "05", label: "مرداد" },
    { value: "06", label: "شهریور" },
    { value: "07", label: "مهر" },
    { value: "08", label: "آبان" },
    { value: "09", label: "آذر" },
    { value: "10", label: "دی" },
    { value: "11", label: "بهمن" },
    { value: "12", label: "اسفند" },
];

const persianDays = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
}));

const persianYears = Array.from({ length: 151 }, (_, i) => {
    const year = 1300 + i;
    return { value: String(year), label: String(year) };
});

const PersianDateInput = ({
                              name = "birthDate",
                              value = "",
                              onChange,
                              className = "",
                          }) => {
    // Parse existing value if any (e.g. "13720101")
    const initialYear = value?.slice(0, 4) || "";
    const initialMonth = value?.slice(4, 6) || "";
    const initialDay = value?.slice(6, 8) || "";

    const [year, setYear] = useState(initialYear);
    const [month, setMonth] = useState(initialMonth);
    const [day, setDay] = useState(initialDay);

    const emitChange = (y, m, d) => {
        if (y && m && d) {
            onChange?.({ target: { name, value: `${y}${m}${d}` } });
        } else {
            onChange?.({ target: { name, value: "" } });
        }
    };

    const handleYearChange = (e) => {
        const val = e.target.value;
        setYear(val);
        emitChange(val, month, day);
    };

    const handleMonthChange = (e) => {
        const val = e.target.value;
        setMonth(val);
        emitChange(year, val, day);
    };

    const handleDayChange = (e) => {
        const val = e.target.value;
        setDay(val);
        emitChange(year, month, val);
    };

    return (
        <div className={`flex gap-2 ${className}`}>
            <SelectInput
                name={`${name}_year`}
                value={year}
                onChange={handleYearChange}
                placeholder="سال"
            >
                <option value="">سال</option>
                {persianYears.map((y) => (
                    <option key={y.value} value={y.value}>
                        {y.label}
                    </option>
                ))}
            </SelectInput>

            <SelectInput
                name={`${name}_month`}
                value={month}
                onChange={handleMonthChange}
                placeholder="ماه"
            >
                <option value="">ماه</option>
                {persianMonths.map((m) => (
                    <option key={m.value} value={m.value}>
                        {m.label}
                    </option>
                ))}
            </SelectInput>

            <SelectInput
                name={`${name}_day`}
                value={day}
                onChange={handleDayChange}
                placeholder="روز"
            >
                <option value="">روز</option>
                {persianDays.map((d) => (
                    <option key={d.value} value={d.value}>
                        {d.label}
                    </option>
                ))}
            </SelectInput>
        </div>
    );
};

export default PersianDateInput;
