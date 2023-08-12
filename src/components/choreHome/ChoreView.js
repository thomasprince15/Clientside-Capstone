import "./ChoreView.css"

export const ChoreView = ({ choreObject, users }) => {
    let assignedUser = null

    if (choreObject.tasks.length > 0) {
        const userTaskRelationship = choreObject.tasks[0]
        assignedUser = users.find(user => user.id === userTaskRelationship.userId)
    }

    return <section className="chore">
        <header>
           {`${choreObject.name}`}
        </header>
        <section>{choreObject.description}</section>
        <footer>
              {
                choreObject.tasks.length
                ? `Currently being worked on by ${assignedUser !== null ? assignedUser?.fullName : ""}`
                : "Not currently being worked on"
            }
        </footer>
    </section>
}