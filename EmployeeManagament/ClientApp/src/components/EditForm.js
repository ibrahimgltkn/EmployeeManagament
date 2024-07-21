import React, { useState, useEffect } from 'react';
import { appConfig } from "../AppConfig";

export const EditForm = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        if (props.data) {
            setName(props.data.name);
            setAge(props.data.age);
            setDepartment(props.data.department);
        }
    }, [props.data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, age, department };
        try {
            await fetch(`${appConfig.apiBase}/api/employee/UpdateEmployee/${props.data.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            props.fetchAfterSuccess();
            setName('');
            setAge('');
            setDepartment('');
            props.setEditData(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-2 p-3 shadow-sm  bg-light rounded">
            <h6 className="mb-4">Personel Düzenle</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">İsim</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Yaş</label>
                    <input
                        type="number"
                        id="age"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Departman</label>
                    <input
                        type="text"
                        id="department"
                        className="form-control"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-outline-warning">Düzenle</button>
            </form>
        </div>
    );
};


