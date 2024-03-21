import { useState, useMemo } from "react";
import "./sign-up-form-frame.css";
import "../../global.css"

const LineFrame = ({
  label1,
  placeholderPlaceholder1: placeholder,
  propWidth1,
  type: inputType,
}) => {
  const [placeholderText4Value, setPlaceholderText4Value] = useState("");

  const placeholder2Style = useMemo(() => {
    return {
      width: propWidth1,
    };
  }, [propWidth1]);

  return (
    <div className="line-frame1">
      <div className="input9">
        <div className="label2">{label1}</div>
        <div className="input7">
          <div className="input8" />
          <input
            className="placeholder2"
            placeholder={placeholder}
            type={inputType}
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