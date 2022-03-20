import React from "react";
import "./FunctionsTable.scss";

import tableData from "./table-data.json";

export default function FunctionsTable () {
    return <div className="table-wrapper">
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Arguments</th>
                    <th>Description</th>
                </tr>
                { tableData.map((rowData, index) => <tr key={ index + "rd" }>
                    { rowData.map((cellData, cellIndex) =>
                        <td key={ index + cellIndex + "cd" }>{ cellData }</td>) }
                </tr>) }
            </tbody>
        </table>
    </div>;
}
