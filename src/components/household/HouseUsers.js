
export const HouseUsers = ({ chorioUserObject, household, fullName, email }) => {

    if (chorioUserObject.household === household.id) {
        return <section className="houseUser" >
        <div>Name: {fullName} </div>
        <div>Email: {email}</div>
    </section>
    }
}