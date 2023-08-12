import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ChoreForm = () => {
    const [chore, update] = useState({
        name : "",
        description: ""
    })
    const navigate = useNavigate()
    const localChorioUser = localStorage.getItem("chorio_user")
    const chorioUserObject = JSON.parse(localChorioUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const choreToSendToAPI = {
            userId: chorioUserObject.id,
            name: chore.name,
            description: chore.description,
            dateCompleted: ""
        }

        return fetch(`http://localhost:8088/chores`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(choreToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/chores")
            })
    }

    return (
        <form className="choreForm">
            <h2 className="choreForm__title">New Chore</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        style={{
                            height: "2rem",
                            width: "20rem"
                        }}
                        className="form-control"
                        placeholder="Name of chore"
                        value={chore.name}
                        onChange={
                            (evt) => {
                               const copy = {...chore} 
                               copy.name = evt.target.value
                               update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of chore"
                        value={chore.description}
                        onChange={
                            (evt) => {
                               const copy = {...chore} 
                               copy.description = evt.target.value
                               update(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={chore.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...chore}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> */}
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Chore
            </button>
        </form>
    )
}