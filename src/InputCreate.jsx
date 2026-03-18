import {useState} from "react";

function InputCreate({setInserts}) {
    const apiUrl = "http://localhost:3000/create";
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 500);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title: title}),
                signal: controller.signal
            });

            clearTimeout(timeout);
            if (!response.ok) throw new Error("El servidor devolvió código de error " + response.status);

            setInserts(inserts => inserts + 1);
        }
        catch(error) {
            console.error("Error creando una nueva tarea", error);
        }

        setTitle("");
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="taskInput">Crea una nueva tarea:</label>
            <input id="taskInput" type="text" placeholder="Título de la tarea" value={title} onChange={handleChange} required/>
            <input type="submit" value="Crear tarea"/>
        </form>
    );
}

export default InputCreate;