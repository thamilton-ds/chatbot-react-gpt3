import { useState } from "react";
import { Button } from "antd";

const Input = ({
    setApiKey
} : {
    setApiKey: any
}) => {
    const [value, setValue] = useState("");

    const onSubmit = (e: any) => {
        e.preventDefault();
        setApiKey(value);
    }
    return (
        <div className="input-page">
            <div className="form-section">
                <label>Input OpenAI API_KEY here:</label>
                <input type='password' value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <Button className="submit-button" onClick={onSubmit}>Submit</Button>
        </div>
    );
}

export default Input;