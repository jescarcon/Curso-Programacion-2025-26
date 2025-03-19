import React, { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/")
            .then(response => response.json())
            .then(data => setData(data.message));
    }, []);

    return <h1>{data ? data : "Cargando..."}</h1>;
}

export default App;
