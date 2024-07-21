import React, { useState } from 'react';
import { appConfig } from "../AppConfig";
import 'bootstrap/dist/css/bootstrap.min.css';

export const AddForm = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, age, department };
        try {
            await fetch(`${appConfig.apiBase}/api/employee/AddEmployee`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            props.fetchAfterSuccess();
            setName('');
            setAge('');
            setDepartment('');
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <button className="btn btn-outline-primary" onClick={handleShowModal}>Personel Ekle</button>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Personel Ekle</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
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
                                    <button type="submit" className="btn btn-outline-success">Ekle</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && <div className="modal-backdrop show"></div>}
        </div>
    );
};
