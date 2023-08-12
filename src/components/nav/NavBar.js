import { AdminNav } from "./AdminNav"
import { UserNav } from "./UserNav"
import "./NavBar.css"

export const NavBar = () => {

    const localChorioUser = localStorage.getItem("chorio_user")
    const chorioUserObject = JSON.parse(localChorioUser)

    if (chorioUserObject.admin) {
        //return admin views
        return <AdminNav />
    }
    else {
        //return user views
        return <UserNav />
    }
}

