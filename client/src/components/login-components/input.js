import { useState, useMemo } from "react";
import "./input.css";

const Input = ({
  placeholderPlaceholder,
  propPadding,
  propDisplay,
  propPadding1,
  propWidth,
}) => {
  const [placeholderTextValue, setPlaceholderTextValue] = useState("");
  const inputStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const labelStyle = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  const input1Style = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  const placeholderStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className="input" style={inputStyle}>
      <div className="label" style={labelStyle}>
        Email
      </div>
      <div className="input1" style={input1Style}>
        <div className="input2" />
        <input
          className="placeholder-input"
          placeholder={placeholderPlaceholder}
          value={placeholderTextValue}
          onChange={(event) => setPlaceholderTextValue(event.target.value)}
          style={placeholderStyle}
        />
      </div>
    </div>
  );
};

export default Input;
