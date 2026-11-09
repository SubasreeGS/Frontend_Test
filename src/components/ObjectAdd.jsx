import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import "../styles/ObjectAdd.css"

function ObjectAdd() {

    const apiUrl = 'https://api.restful-api.dev/objects'

    const [objects, setObjects] = useState([])

    const [name, setName] = useState("")
    const [year, setYear] = useState(2026)
    const [price, setPrice] = useState("")
    const [cpu, setCpu] = useState("")
    const [color, setColor] = useState("")

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });

    const addObject = async (e) => {
        e.preventDefault()

        let newObj = {
            'name': name,
            'data': {
                'Year': Number(year),
                'Price': Number(price),
                'CPU': cpu,
                'color': color
            }
        }

        try {
            let response = await axios.post(apiUrl, newObj)

            let temp = [...objects]
            setObjects([response.data, ...temp])

            setName("")
            setYear(2026)
            setPrice("")
            setCpu("")
            setColor("")

            Toast.fire({
                icon: 'success',
                title: 'object added successfully!'
            });
        }
        catch (err) {
            let message = err?.response?.data?.message || "Failed to add object"
            Toast.fire({
                icon: 'error',
                title: message
            });
        }
    }

    return (
        <div className="container-fluid my-3">
            <div className="card add-object-card shadow-sm">
                <div className="card-header add-object-card-header bg-light">
                    <h4 className="m-0 text-primary">Add New Object</h4>
                </div>
                <div className="card-body">
                    <form className="add-object-form" onSubmit={(e) => addObject(e)}>
                        
                        <div className="row g-3">
                            
                            <div className="col-12">
                                <label className="form-label fw-semibold">Name:</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control" 
                                    required 
                                />
                            </div>

                            
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Year:</label>
                                <input 
                                    type="number" 
                                    value={year} 
                                    onChange={(e) => setYear(e.target.value)}
                                    className="form-control" 
                                    required 
                                />
                            </div>

                          
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Price:</label>
                                <input 
                                    type="number" 
                                    step="0.01" 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="form-control" 
                                   
                                    required 
                                />
                            </div>

                          
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">CPU Model:</label>
                                <input 
                                    type="text" 
                                    value={cpu} 
                                    onChange={(e) => setCpu(e.target.value)}
                                    className="form-control" 
                                    
                                    required 
                                />
                            </div>

                           
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Color:</label>
                                <input 
                                    type="text" 
                                    value={color} 
                                    onChange={(e) => setColor(e.target.value)}
                                    className="form-control" 
                                    
                                    required 
                                />
                            </div>
                        </div>

                       
                        <div className="mt-4 text-end">
                            <button className="btn btn-primary px-4 add-object-btn" type="submit">
                                Add Object
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ObjectAdd