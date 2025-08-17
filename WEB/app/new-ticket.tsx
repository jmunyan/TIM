import React, { useState } from "react";

type Part = {
    id: number;
    numberOfParts: number;
    partName: string;
    maskingRequired: boolean;
    notes: string;
};

export default function NewTicket() {
    const [customer, setCustomer] = useState("");
    const [parts, setParts] = useState<Part[]>([
        { id: 1, numberOfParts: 1, partName: "", maskingRequired: false, notes: "" },
    ]);

    const handlePartChange = (index: number, field: keyof Part, value: any) => {
        setParts((prev) =>
            prev.map((part, i) =>
                i === index ? { ...part, [field]: value } : part
            )
        );
    };

    const addPart = () => {
        setParts((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                numberOfParts: 1,
                partName: "",
                maskingRequired: false,
                notes: "",
            },
        ]);
    };

    const removePart = (index: number) => {
        setParts((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here
        alert("Ticket submitted!");
    };

    return (
        <div style={{ maxWidth: 900, margin: "2rem auto", padding: 24 }}>
            <h1>Create New Ticket</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 24 }}>
                    <label>
                        Customer:
                        <input
                            type="text"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            required
                            style={{ marginLeft: 8, width: 300 }}
                        />
                    </label>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Number of Parts</th>
                            <th>Part Name</th>
                            <th>Masking Required</th>
                            <th>Notes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map((part, idx) => (
                            <tr key={part.id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <input
                                        type="number"
                                        min={1}
                                        value={part.numberOfParts}
                                        onChange={(e) =>
                                            handlePartChange(idx, "numberOfParts", Number(e.target.value))
                                        }
                                        style={{ width: 60 }}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={part.partName}
                                        onChange={(e) =>
                                            handlePartChange(idx, "partName", e.target.value)
                                        }
                                        required
                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <input
                                        type="checkbox"
                                        checked={part.maskingRequired}
                                        onChange={(e) =>
                                            handlePartChange(idx, "maskingRequired", e.target.checked)
                                        }
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={part.notes}
                                        onChange={(e) =>
                                            handlePartChange(idx, "notes", e.target.value)
                                        }
                                        rows={2}
                                        style={{ width: "100%" }}
                                    />
                                </td>
                                <td>
                                    {parts.length > 1 && (
                                        <button type="button" onClick={() => removePart(idx)}>
                                            Remove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={addPart} style={{ marginBottom: 24 }}>
                    Add Part
                </button>
                <div>
                    <button type="submit">Create Ticket</button>
                </div>
            </form>
        </div>
    );
}