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
        <div>
            <h1>Çalışan Düzenle</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">İsim</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="age">Yaş</label>
                    <input
                        type="number"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="department">Departman</label>
                    <input
                        type="text"
                        name="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Düzenle</button>
            </form>
        </div>
    );
};


