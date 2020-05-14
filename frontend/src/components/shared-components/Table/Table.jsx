import React from "react";
import classes from "./Table.module.css";
import TableRow from "./TableRow/TableRow";

const Table = (props) => {
  let headings = [];
  if (props.values) {
    const headingSample = props.values[0];
    delete headingSample.id;

    headings = Object.keys(headingSample);
  }

  return (
    <div ref={props.reference} className={classes.TableContainer}>
      <h1 className={classes.Caption}>{props.tableCaption}</h1>
      <table className={classes.Table}>
        <thead>
          <TableRow values={headings} type="th" />
        </thead>
        <tbody>
          {props.values.map((value) => {
            delete value.id;
            return <TableRow values={Object.values(value)} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
