import { useMemo } from "react";
import "./Select.css";

type selectProps = {
    onChange: (e: any) => void;
    id: string;
    value: string;
}

const Select = ({onChange, id, value}: selectProps) => {
    const years = useMemo(() => {
        const result: string[] = ["Select year"];
        for (let i = 0; i < 20; i++) {
            result.push((2024 - i).toString());
        }
        return result;
    }, []);
    
    return (
        <select id={id} onChange={onChange} value={value}>
            {years.map((year: string) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
}

export default Select;
