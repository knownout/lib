import React from "react";
import ReactDOM from "react-dom";

import FunctionsTable from "./FunctionsTable";

import "./styles.scss";

function App () {
    return <div>
        <h1>Available functions</h1>
        <span>List of @knownout/lib package functions</span>
        <FunctionsTable />
    </div>;
}

ReactDOM.render(<App />, document.querySelector("#app-root"));
