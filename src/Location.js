import React from "react";

export function Location(props) {
  let svg = null;
  if (
    "geometry" in props.attributes &&
    props.attributes.geometry &&
    props.attributes.geometry.type === "Polygon"
  ) {
    svg = (
      <svg
        height="100px"
        width="100px"
        viewBox="-75 -75 150 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#fdcab4"
          stroke="#dc4405"
          x="0"
          y="0"
          d={props.attributes.geometry.coordinates[0]
            .map((coordinate, index) => {
              let x = coordinate[0] - parseFloat(props.attributes.longitude);
              let y = coordinate[1] - parseFloat(props.attributes.latitude);
              if (index === 0) {
                return `M ${Math.round(x * 100000)},${Math.round(y * 100000)}`;
              }
              return `L ${Math.round(x * 100000)},${Math.round(y * 100000)}`;
            })
            .join("\n")}
        />
      </svg>
    );
  } else {
  }
  return (
    <div>
      <h2>{props.attributes.name}</h2>
      {svg}
    </div>
  );
}
