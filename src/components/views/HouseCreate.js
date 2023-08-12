import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./login.css"

export const HouseCreate = (props) => {
    const [household, setHouse] = useState({
        id: 0,
        name: ""
    })
    let navigate = useNavigate()

    const registerNewHouse = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(household)
        })
            .then(res => res.json())
            .then(createdHouse => {
                if (createdHouse.hasOwnProperty("id")) {
                    localStorage.setItem("chorio_user", JSON.stringify({
                        id: createdHouse.id,
                        name: createdHouse.name
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/household=${household.name}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate household. No good.
                    window.alert("Account with that household already exists")
                }
                else {
                    // Good household, create user.
                    registerNewHouse()
                }
            })
    }

    const updateHouse = (evt) => {
        const copy = {...household}
        copy[evt.target.id] = evt.target.value
        setHouse(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--household" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Name your Household</h1>
                <fieldset>
                    <label htmlFor="Name"> Name </label>
                    <input onChange={updateHouse}
                           type="text" id="Name" className="form-control"
                           placeholder="Enter your houshold name" required autoFocus />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}
