import { AdminViews } from "./AdminViews.js"
import { HouseCreate } from "./HouseCreate.js"
import { UserViews } from "./UserViews.js"


export const ApplicationViews = () => {

    const localChorioUser = localStorage.getItem("chorio_user")
    const chorioUserObject = JSON.parse(localChorioUser)

    if (chorioUserObject.admin === true && chorioUserObject.household === 0) {
        return <HouseCreate />
    }
    else if (chorioUserObject.admin === false && chorioUserObject.household === 0) {
        return <HouseCreate />
    }
    else if (chorioUserObject.admin === true) {
        //return admin views
        return <AdminViews />
    }    
    else {
        //return user views
        return <UserViews />
    }

}