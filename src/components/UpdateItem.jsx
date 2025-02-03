import { useState, useEffect } from "react";

const UpdateItem = ({ itemId }) => {
    const [item, setItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({});
    const API_URI = `http://localhost:8080/doors/${itemId}`;

    // Fetch item when the component mounts or when itemId changes
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(API_URI);
                if (!response.ok) throw new Error("Failed to fetch item");
                const data = await response.json();
                setItem(data);
                setUpdatedItem(data); // Initialize with existing data
            } catch (error) {
                console.error(error);
            }
        };

        fetchItem();
    }, [itemId]);

    // Handle input changes
    const handleChange = (e) => {
        setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
    };

    // Handle form submission (PUT request)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_URI, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedItem),
            });

            if (!response.ok) throw new Error("Failed to update item");
            const data = await response.json();
            setItem(data);
            alert("Item updated successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div>
            <h2>Update {item.name}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={updatedItem.name || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Status:
                    <select name="status" value={updatedItem.status} onChange={handleChange}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateItem;
