import { useState } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
    const [selectedItemId, setSelectedItemId] = useState(null);

    return (
        <div>
            <h1>Update a Door</h1>
            <button onClick={() => setSelectedItemId("1")}>Edit Front Door</button>
            <button onClick={() => setSelectedItemId("2")}>Edit Back Door</button>

            {selectedItemId && <UpdateItem itemId={selectedItemId} />}
        </div>
    );
}

export default App;
