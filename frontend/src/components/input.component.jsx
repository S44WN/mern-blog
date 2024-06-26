import { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        id={id}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon "}></i>
      {name === "password" ? (
        <i
          className={
            "fi fi-rr-eye" +
            (!passwordVisible ? "-crossed" : "") +
            " input-icon left-auto right-4 cursor-pointer"
          }
          onClick={() => setPasswordVisible(!passwordVisible)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
