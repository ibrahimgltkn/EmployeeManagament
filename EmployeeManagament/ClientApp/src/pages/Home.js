import { useEffect, useState } from "react";
import { appConfig } from "../AppConfig";
import { AddForm } from "../components/AddForm";
import { EditForm } from "../components/EditForm";
import 'bootstrap/dist/css/bootstrap.min.css';



export const Home = () => {
    const [employees, setEmployees] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);
    const [pagination, setPagination] = useState({
        current: 0,
        total: 0
    })

    const fetchData = async (page = 1 ) => {
        try {
            const response = await fetch(`${appConfig.apiBase}/api/employee?page=${page}`).then(res => res.json());
            console.log(response)
            setEmployees(response.list)
            setPagination({
                current: response.pageNumber,
                total: response.totalPage
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    console.log(pagination)


    const paginationArray = Array.from({ length: pagination.total }, (_, index) => index + 1)
    return (
        <div className="home-page">
            <div className="row">
                <div className="col-6">
                    <AddForm fetchAfterSuccess={fetchData} />
                </div>
                <div className="col-6">
                    {editData && <EditForm fetchAfterSuccess={fetchData} data={editData} setEditData={setEditData} />}
                </div>
            </div>
            {loading ? 'Loading....' :
                <div>
                    {employees?.length > 0 ? (
                        <div className="mt-3 p-3 shadow-sm  bg-white rounded">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="w-25">Ad</th>
                                        <th>Yaş</th>
                                        <th>Departman</th>
                                        <th>İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.age}</td>
                                            <td>{item.department}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning me-2"
                                                    onClick={() => setEditData(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={async () => {
                                                        try {
                                                            await fetch(`${appConfig.apiBase}/api/employee/DeleteEmployee/${item.id}`, {
                                                                method: 'DELETE',
                                                            });
                                                            fetchData();
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {pagination.total > 1 &&
                                <div className="d-flex justify-content-center gap-1">
                                    {paginationArray.map(number => (
                                        <button
                                            className="btn btn-dark"
                                            key={number}
                                            onClick={() => fetchData(number)}
                                            disabled={number === pagination.current}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                            }

                            
                        </div>) : (

                        <div className="alert alert-warning mt-5 text-center w-auto" role="alert">
                            Personel kaydı bulunmamaktadır.
                        </div>
                    )
                    }
                </div>}

        </div>
    )
}