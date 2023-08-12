import { Outlet, Route, Routes } from "react-router-dom"
import { ChoreContainer } from "../chores/ChoreContainer"
import { ChoreList } from "../chores/ChoreList"
import { ChoreForm } from "../chores/ChoreForm"
import { ChoreEdit } from "../chores/ChoreEdit"
import { HouseList } from "../household/HouseList"
import { ChoreViewList } from "../choreHome/ChoreViewList"



export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Chorio</h1>
                    <div>Where choring happens</div>
                    <Outlet />
                </>
            }>
                <Route path="/" element={<ChoreViewList />} />
                <Route path="chores" element={<ChoreContainer />} />
                <Route path="chores" element={<ChoreList />} />
                <Route path="chore/create" element={<ChoreForm />} />
                <Route path="household" element={<HouseList />} />
                <Route path="chores/:choreId/edit" element={<ChoreEdit />} />
            </Route>
        </Routes>
    )
}