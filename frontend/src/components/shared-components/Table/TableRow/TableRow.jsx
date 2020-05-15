import React from "react";
import classes from "./TableRow.module.css";
import moment from "moment";
import { CardButton } from "../../Button/Button";
const TableRow = (props) => {
  let key = 1;
  return (
    <tr className={classes.Tr}>
      {props.values.map((value, index) => {
        let val = value;
        if (typeof value === typeof true) {
          val = val ? "Yes" : "No";
        } else if (`${value}`.split("-").length > 2) {
          val = moment(value).format("MMM Do YYYY");
        }
        if (props.fieldNames && props.fieldNames[index] === "is_paid") {
          return (
            <td key={key++}>
              <CardButton onClick={props.onFieldClick}>make paid</CardButton>
            </td>
          );
        }

        return props.type === "th" ? (
          <th className={classes.Th} key={key++}>
            {value.split("_").join(" ")}
          </th>
        ) : (
          <td className={classes.Td} key={key++}>
            {val}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
