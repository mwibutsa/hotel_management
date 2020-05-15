import React from "react";
import classes from "./Table.module.css";
import TableRow from "./TableRow/TableRow";

const Table = (props) => {
  let headings = [];
  if (props.values) {
    const headingSample = props.values[props.values.length - 1];
    if (headingSample) {
      delete headingSample.id;

      headings = Object.keys(headingSample);
    }
  }

  let tableData = (
    <TableRow values={["The client has no unpaid bills"]} key="sdfkd" />
  );
  let total = null;

  if (props.total[0] > 0) {
    total = <TableRow values={["TOTAL", `$${props.total[0]}`]} type="th" />;
  }
  if (props.values.length) {
    let key = 1;
    tableData = props.values.map((value) => {
      const data = { ...value };
      delete data.id;
      return (
        <TableRow
          fieldNames={Object.keys(data)}
          values={Object.values(data)}
          key={key++}
          onFieldClick={() => props.onClick(value.id)}
        />
      );
    });
  }

  return (
    <div ref={props.reference} className={classes.TableContainer}>
      <h1 className={classes.Caption}>{props.tableCaption}</h1>
      <table className={classes.Table}>
        <thead>
          <TableRow values={headings} type="th" />
        </thead>
        <tbody>
          {tableData}
          <TableRow values={["Room Bills", props.total[1]]} />
          {total}
          {props.children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
