import React, { useState } from "react";

export default function ColorPicker() {
  const [userColor, setUserColor] = useState("#db3c3c");

  const changeUserColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setUserColor(newColor);
    document.documentElement.style.setProperty("--user", newColor);
  };

  return (
    <div className="colorPickerContainer">
      <label htmlFor="colorPicker">Choose highlight color</label>
      <input
        id="colorPicker"
        type="color"
        className="colorPicker"
        value={userColor}
        onChange={changeUserColor}
      />
    </div>
  );
}
