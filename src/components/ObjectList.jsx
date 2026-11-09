import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import "../styles/ObjectList.css"

function ObjectList() {

    const apiUrl = 'https://api.restful-api.dev/objects'

    const [objects, setObjects] = useState([])
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });

    useEffect(() => {
        const getObjects = async () => {
            try {
                let res = await axios.get(apiUrl)
                setObjects(res.data)
            }
            catch (err) {
                let message = err?.response?.data?.message || "Failed to fetch objects"
                Toast.fire({
                    icon: 'error',
                    title: message
                });
            }
        }
        getObjects()
    }, [])

    const totalPages = Math.ceil((objects.length / size)) 
    const currentPage = objects.slice(((page - 1) * size), (page * size))

    const deleteObject = async (objectId) => {
        try {
            await axios.delete(`${apiUrl}/${objectId}`)

            setObjects([...objects.filter(o => o.id !== objectId)])
            Toast.fire({
                icon: 'success',
                title: 'object deleted successfully!'
            });
        }
        catch (err) {
            let message = err?.response?.data?.message || "Failed to delete object"
            Toast.fire({
                icon: 'error',
                title: message
            });
        }
    }

    const getValue = (data, keys) => {
        if (!data) return "N/A"
        for (let key of keys) {
            if (data[key] !== undefined && data[key] !== null) {
                return data[key]
            }
        }
        return "N/A"
    }

    return (
        <div className="container-fluid my-3">
            <div className="card object-list-card shadow-sm">
                <div className="card-header object-list-card-header bg-light d-flex justify-content-between align-items-center">
                    <h4 className="m-0 text-primary">Object List</h4>
                    <span className="badge bg-secondary">Total: {objects.length}</span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped align-middle mb-0 object-table">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" style={{ width: '5%' }}>#</th>
                                    <th scope="col" style={{ width: '30%' }}>Name</th>
                                    <th scope="col" style={{ width: '20%' }}>Color</th>
                                    <th scope="col" style={{ width: '15%' }}>Price</th>
                                    <th scope="col" style={{ width: '20%' }}>CPU</th>
                                    <th scope="col" style={{ width: '10%' }} className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPage.length > 0 ? (
                                        currentPage.map((obj, index) => {
                                            const colorVal = getValue(obj.data, ['color', 'Color', 'Strap Colour'])
                                            const priceVal = getValue(obj.data, ['price', 'Price'])
                                            const cpuVal = getValue(obj.data, ['CPU model', 'cpu model', 'CPU', 'Cpu'])

                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{(page - 1) * size + index + 1}</th>
                                                    <td className="fw-semibold text-dark">{obj.name || "N/A"}</td>
                                                    <td>{colorVal}</td>
                                                    <td>{priceVal !== "N/A" ? `$${priceVal}` : "N/A"}</td>
                                                    <td>{cpuVal}</td>
                                                    <td className="text-center">
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger border-0"
                                                            onClick={() => deleteObject(obj.id)}
                                                            title="Delete Object"
                                                        >
                                                            <i className="bi bi-trash fs-5"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">
                                                No objects available
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                  
                    <div className="p-3">
                        <nav>
                            <ul className="pagination justify-content-center m-0">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(page - 1)}
                                    >
                                        Previous
                                    </button>
                                </li>
                                <li className="page-item disabled">
                                    <span className="page-link text-dark fw-bold">
                                        Page {page} of {totalPages}
                                    </span>
                                </li>
                                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(page + 1)}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ObjectList