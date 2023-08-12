

export const DayList = () => {
    const [days, setDays] = useState([])

    const getAllDays = () => {
        fetch(`http://localhost:8088/days`)
            .then(response => response.json())
            .then((dayArray) => {
                setDays(dayArray)
            })
    }


    return <section className="day">
    <header>
        {
            currentUser.staff
                `${day.id}`
                
        }
    </header>
    <section>{day.description}</section>
    <footer>
        {
            // ticketObject.employeeTickets.length
                // ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                // : buttonOrNoButton()
        }
        {
            // canClose()
        }
        {
            // deleteButton()
        }
    </footer>
</section>
}