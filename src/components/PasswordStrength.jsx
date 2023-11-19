import React from "react";
import zxcvbn from "zxcvbn";
import "./PasswordStrength.css";

function PasswordStrength(props) {
  const { password } = props;
  const passwordStrength = zxcvbn(password);

  const passwordStrengthLabel = (result) => {
    switch (result.score) {
      case 0:
        return ["weakest", "Weak"];
      case 1:
        return ["weak", "Weak"];
      case 2:
        return ["fair", "Fair"];
      case 3:
        return ["good", "Good"];
      case 4:
        return ["strong", "Strong"];
      default:
        return ["weakest", "Weak"];
    }
  };

  return (
    <div className="progress">
      <div
        className={`value strength-${
          passwordStrengthLabel(passwordStrength)[0]
        }`}
        style={{
          textAlign: "center",
          width: password ? `${(passwordStrength.score + 1) * 20}%` : "0%",
        }}>
        {" "}
        {password ? passwordStrengthLabel(passwordStrength)[1] : ""}
      </div>
    </div>
  );
}

export default PasswordStrength;
