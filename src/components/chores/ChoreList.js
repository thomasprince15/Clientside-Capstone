import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Chore } from "./Chore"
import "./Chores.css"

export const ChoreList = ({ searchTermState }) => {
    const [chores, setChores] = useState([])
    const [users, setusers] = useState([])
    const [filteredChores, setFiltered] = useState([])
    const navigate = useNavigate()

    const localChorioUser = localStorage.getItem("chorio_user")
    const chorioUserObject = JSON.parse(localChorioUser)

    useEffect(
        () => {
            const searchedChores = chores.filter(chore => chore.description.startsWith(searchTermState))
            setFiltered(searchedChores)
        },
        [searchTermState]
    )

    const getAllChores = () => {
        fetch(`http://localhost:8088/chores?_embed=tasks`)
            .then(response => response.json())
            .then((choreArray) => {
                setChores(choreArray)
            })
    }

    useEffect(
        () => {
            getAllChores()

            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((userArray) => {
                    setusers(userArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    useEffect(
        () => {
                const myChores = chores.filter(chore => chore.userId === chorioUserObject.id)
                setFiltered(myChores) 
        },
        [chores]
    )

    return <>
        {

            <>
                {/* <select >
                    <option value={days}>days</option>
                </select> */}
                <button onClick={() => { setFiltered( chores) }}>Show All</button>
                {/* <button onClick={() => { setFiltered( myChores) }}>Show My Chores</button> */}
                <button onClick={() => navigate("/chore/create")}>Create Chore</button>
            </>
        }

        <h2>List of Chores</h2>

        <article className="chores">
            {
                filteredChores.map(
                    (chore) => <Chore
                        getAllChores={getAllChores}
                        currentUser={chorioUserObject}
                        users={users}
                        choreObject={chore} />
                )
            }
        </article>
    </>
}