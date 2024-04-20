import { useMemo } from "react";
import "../../css/input.css";

const Input = ({
  placeholderPlaceholder: placeholderPlaceholder,
  value: placeholderTextValue,
  onChange: onChange,
  propPadding,
  propDisplay,
  propPadding1,
  propWidth,
}) => {
  // const [placeholderTextValue, setPlaceholderTextValue] = useState("");
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
      height: "50px"
    };
  }, [propPadding1]);

  const placeholderStyle = useMemo(() => {
    return {
      width: propWidth,
      height: "50px"
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
          onChange={onChange}
          style={placeholderStyle}
        />
      </div>
    </div>
  );
};

export default Input;
