import { Link, useNavigate } from "react-router-dom"
import "./Chores.css"
import { useEffect, useState } from "react"


export const Chore = ({ choreObject, currentUser, users, getAllChores }) => {
    const Navigate = useNavigate()
    const [feedback, setFeedback] = useState("")
    let assignedUser = null

    if (choreObject.tasks.length > 0) {
        const userTaskRelationship = choreObject.tasks[0]
        assignedUser = users.find(user => user.id === userTaskRelationship.userId)
    }

    const deleteButton = () => {
        if (currentUser.id === choreObject.userId) {
            return <button onClick={() => {
                return fetch(`http://localhost:8088/Chores/${choreObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllChores()
                    })
            }} className="chore__delete">Delete</button>
        }
        else {
            return ""
        }
    }

    const editButton = () => {
        if (currentUser.id === choreObject.userId) {
            return <button className="chore__edit"
                onClick={() => Navigate(`/chores/${choreObject.id}/edit`)}
            >Edit</button>
        }
        else {
            return ""
        }
    }

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const canClose = (event) => {
        if (currentUser.id === assignedUser?.id && choreObject.dateCompleted === "") {
            return <button onClick={closeChore} className="chore__finish">complete</button>
        }
        else {
            return ""
        }
    }

    const closeChore = () => {
        const copy = {
            userId: choreObject.userId,
            name: choreObject.name,
            description: choreObject.description,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/chores/${choreObject.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Chore completed")
            })
            .then(getAllChores)
    }

    const buttonOrNoButton = () => {
        return <button
            onClick={() => {
                fetch(`http://localhost:8088/tasks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: currentUser.id,
                        choreId: choreObject.id
                    })
                })
                    .then(response => response.json())
                    .then(() => {
                        //get the state from the API
                        getAllChores()
                    })
            }}
        >Claim</button>
    }

    return <section className="chore">
        <header>
            {
                // <Link to={`/chores/${choreObject.id}/edit`}>chore {choreObject.id}</Link>
                ` ${choreObject.name}`
            }
        </header>
        <section>{choreObject.description}</section>

        <footer>
            {
                choreObject.tasks.length
                    ? `Currently being worked on by ${assignedUser !== null ? assignedUser?.fullName : ""}`
                    : buttonOrNoButton()
                    
            }
            {
                editButton()
            }
            {
                canClose(<div className={`${feedback.includes("Error") ? "error" : "feedback"}
                    ${feedback === "" ? "invisible" : "visible"}`}>
                    {feedback}
                    </div>)
            }
            {
                deleteButton()
            }
        </footer>
    </section>
}