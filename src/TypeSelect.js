import React, { useState } from "react";

function TypeSelect(props) {
  const handleClick = (e) => {
    props.setType(e.target.name, e.target.value !== "true");
  };

  return (
    <div className="types">
      {props.types.map((type) => {
        return (
          <label key={type.name}>
            <input
              type="checkbox"
              value={type.active}
              name={type.name}
              checked={type.active}
              onChange={handleClick}
            />
            {type.name}
          </label>
        );
      })}
    </div>
  );
}

export { TypeSelect };
