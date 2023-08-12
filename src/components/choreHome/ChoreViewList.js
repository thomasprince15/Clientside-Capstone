import { useEffect, useState } from "react"
import { ChoreView } from "./ChoreView" 
import "./ChoreView.css"

export const ChoreViewList = ({ searchTermState }) => {
    const [chores, setChores] = useState([])
    const [users, setusers] = useState([])
    const [filteredChores, setFiltered] = useState([])

    const localChorioUser = localStorage.getItem("chorio_user")
    const chorioUserObject = JSON.parse(localChorioUser)

    useEffect(
        () => {
            console.log(searchTermState)
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
        

        <h2>Your Created Chores</h2>

        <article className="chores">
            {
                filteredChores.map(
                    (chore) => <ChoreView
                        users={users}
                        choreObject={chore} />
                )
            }
        </article>
    </>
}