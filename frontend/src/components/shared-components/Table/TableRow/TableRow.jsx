import React from "react";
import classes from "./TableRow.module.css";
import moment from "moment";

const TableRow = (props) => {
  return (
    <tr className={classes.Tr}>
      {props.values.map((value) => {
        let val = value;
        if (typeof value === typeof true) {
          val = val ? "Yes" : "No";
        } else if (`${value}`.split("-").length > 2) {
          val = moment(value).format("MMM Do YYYY");
        }

        return props.type === "th" ? (
          <th className={classes.Th} key={value}>
            {value.split("_").join(" ")}
          </th>
        ) : (
          <td className={classes.Td} key={value}>
            {val}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
