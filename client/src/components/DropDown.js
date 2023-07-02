import '../style/DropDown.css';
import React, { useState, useEffect } from 'react';
const Dropdown = ({ trigger, menu, handleSelect }) => {
  const [open, setOpen] = React.useState(false);
  const [Pack, setPack] = React.useState([{}]);
  // const handleOpen = () => {
  //   setOpen(!open);
  // };

  // const handleMenuOne = () => {
  //   // do something
  //   setOpen(false);
  // };

  // const handleMenuTwo = () => {
  //   // do something
  //   setOpen(false);
  // };

  return (
    <select className="dropdown" onChange={handleSelect}>
      <option value="" defaultValue="selected" hidden="hidden">
        Choose here
      </option>

      {menu.map(({ description, _id }, index) => (
        <option data-id={_id} className="menu" key={index} value={description}>
          {description}
        </option>
      ))}
    </select>
  );
};
export default Dropdown;
