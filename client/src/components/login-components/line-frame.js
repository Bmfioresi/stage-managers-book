import { useState, useMemo } from "react";
import "./line-frame.css";

const LineFrame = ({
  label,
  placeholderPlaceholder,
  label1,
  placeholderPlaceholder1,
  propWidth,
  propWidth1,
}) => {
  const [placeholderTextValue, setPlaceholderTextValue] = useState("");
  const [placeholderText4Value, setPlaceholderText4Value] = useState("");
  const placeholder1Style = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const placeholder2Style = useMemo(() => {
    return {
      width: propWidth1,
    };
  }, [propWidth1]);

  return (
    <div className="line-frame1">
      <div className="input6">
        <div className="label2">{label}</div>
        <div className="input7">
          <div className="input8" />
          <input
            className="placeholder2"
            placeholder={placeholderPlaceholder}
            type="text"
            value={placeholderTextValue}
            onChange={(event) => setPlaceholderTextValue(event.target.value)}
            style={placeholder1Style}
          />
        </div>
      </div>
      <div className="input9">
        <div className="label2">{label1}</div>
        <div className="input7">
          <div className="input8" />
          <input
            className="placeholder2"
            placeholder={placeholderPlaceholder1}
            type="text"
            value={placeholderText4Value}
            onChange={(event) => setPlaceholderText4Value(event.target.value)}
            style={placeholder2Style}
          />
        </div>
      </div>
    </div>
  );
};

export default LineFrame;
