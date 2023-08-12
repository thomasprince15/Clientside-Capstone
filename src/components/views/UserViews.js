import { Outlet, Route, Routes } from "react-router-dom"
import { ChoreList } from "../chores/ChoreList"
import { ChoreForm } from "../chores/ChoreForm"
import { ChoreEdit } from "../chores/ChoreEdit"
import { HouseList } from "../household/HouseList"
import { ChoreContainer } from "../chores/ChoreContainer"
import { ChoreViewList } from "../choreHome/ChoreViewList"

export const UserViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Chorio</h1>
                    <div>Where stuff gets done</div>
                    <Outlet />
                </>
            }>
                <Route path="/" element={<ChoreViewList />} />
                <Route path="chores" element={<ChoreContainer />} />
                <Route path="chores" element={<ChoreList />} />
                <Route path="chore/create" element={<ChoreForm />} />
                <Route path="chores/:choreId/edit" element={<ChoreEdit />} />
                <Route path="household" element={<HouseList />} />
            </Route>
        </Routes>
    )
}