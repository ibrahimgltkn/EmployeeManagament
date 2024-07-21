import { useEffect, useState } from "react";
import { appConfig } from "../AppConfig";
import { AddForm } from "../components/AddForm";
import { EditForm } from "../components/EditForm";



export const Home = () => {
    const [employees, setEmployees] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${appConfig.apiBase}/api/employee`).then(res => res.json());
            console.log(response)
            setEmployees(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="home-page">
            <AddForm fetchAfterSuccess={fetchData} />
            {editData && <EditForm fetchAfterSuccess={fetchData} data={editData} setEditData={setEditData} />}
            {loading ? 'Loading....' :
                <div>
                    {employees?.length > 0 && employees.map((item) => {

                        return (
                            <div className="employee-card" key={item.id }>
                                <p className="name">{item.name}</p>
                                <p className="age">{item.age}</p>
                                <p className="department">{item.department}</p>
                                <button onClick={() => 
                                    setEditData(item)
                                }>Edit</button>
                                <button onClick={async () => {
                                    try {
                                        await fetch(`${appConfig.apiBase}/api/employee/DeleteEmployee/${item.id}`, {
                                            method: 'DELETE',
                                        });
                                        fetchData();
                                    } catch (error) {
                                        console.log(error)
                                    } 
                                }}>Delete</button>
                            </div>
                        )
                    })}
                </div>}
        
        </div>
    )
}