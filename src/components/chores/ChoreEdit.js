import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ChoreEdit = () => {
    // TODO: This state object should not be blank
    const [chore, assignChore] = useState({
        description: ""
    })

    const { choreId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
        fetch(`http://localhost:8088/chores/${choreId}`)
            .then(response => response.json())
            .then((data) => {
                assignChore(data)
            })
        }, 
        [choreId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/chores/${chore.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chore)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/chores")
            })

    }

    return <form className="choreForm">
        <h2 className="choreForm__title">Chores</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Name:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "2rem",
                        width: "20rem"
                    }}
                    className="form-control"
                    value={chore.name}
                    onChange={
                        (evt) => {
                            const copy = { ...chore }
                            copy.name = evt.target.value
                            assignChore(copy)
                        }
                    }>{chore.name}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={chore.description}
                    onChange={
                        (evt) => {
                            const copy = { ...chore }
                            copy.description = evt.target.value
                            assignChore(copy)
                        }
                    }>{chore.description}</textarea>
            </div>
        </fieldset>
        {/* <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    onChange={
                        (evt) => {
                            const copy = { ...chore }
                            copy.emergency = evt.target.checked
                            assignChore(copy)
                        }
                    } />
            </div>
        </fieldset> */}
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}