import ObjectAdd from "./ObjectAdd"
import ObjectList from "./ObjectList"
import "../styles/ObjectsDashboard.css"

function ObjectsDashboard() {
    return (
        <div className="dashboard-container container-fluid py-2">
            <div className="mb-4">
                <ObjectAdd />
            </div>
            
            <hr className="dashboard-divider my-4" />
            
            <div>
                <ObjectList />
            </div>
        </div>
    )
}

export default ObjectsDashboard