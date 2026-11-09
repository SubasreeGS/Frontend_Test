import { Route, Routes } from "react-router"
import ObjectAdd from "./components/ObjectAdd"
import ObjectList from "./components/ObjectList"
import ObjectsDashboard from "./components/ObjectsDashboard"
import Navbar from "./components/Navbar"

const App = () =>
{
  return (
    <div>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="" element={<ObjectsDashboard />} />
                    <Route path="dashboard" element={<ObjectsDashboard />} />
                    <Route path="objects" element={<ObjectList />} />
                    <Route path="add-object" element={<ObjectAdd />} />
                   
                </Routes>
            </div>
        </div>


   
  )

}
export default App

