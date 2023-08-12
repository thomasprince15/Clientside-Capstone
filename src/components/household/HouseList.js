import { useEffect, useState } from "react"
import { HouseUsers } from "./HouseUsers"
import "./Household.css"

export const HouseList = () => {
    const localChorioUser = localStorage.getItem("chorio_user")
    const chorioUserObject = JSON.parse(localChorioUser)
    const [users, setusers] = useState([])
    const [household, setHousehold] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((usersArray) => {
                    setusers(usersArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/household`)
                .then(response => response.json())
                .then((householdArray) => {
                    setHousehold(householdArray)
                })
        },
        []
    )

    
        return <article className="houseusers">
            {
                users.map(user =>  <HouseUsers
                    chorioUserObject={chorioUserObject} 
                    household={household}
                    fullName={user.fullName}
                    email={user.email} />)
            }
        </article>
    
}