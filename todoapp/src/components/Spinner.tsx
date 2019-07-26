import * as React from "react";
import spinnerIcon from "../Spinner.png";

// type SpinnerProps = {
//   src: string;
// };

const Spinner: React.FC = () => {
  return (
    <img
      src={spinnerIcon}
      alt="spinner"
      style={{
        height: "50px",
        position: "relative",
        top: "20px"
      }}
    />
  );
};

export default Spinner;
