import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function PersonnelForm() {

    const {id} = useParams();
    const { setNotification } = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const personEditMessageString = "Person updated successfully.";
    const personCreateMessageString = "Person added successfully.";
    const errorMessageString = "Something went wrong :(";
    const [person, setPerson] = useState({
        id: null,
        name: '',
        age: null,
        gender: '',
    })

    if (id){
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/personnel/${id}`)
                .then(({data}) => {
                    const actualData = data.data
                    setPerson({
                        id: id,
                        name: actualData['name'],
                        age: actualData['age'],
                        gender: actualData['gender'],
                    })
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }, []);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (id){
            axiosClient.put(`/personnel/${id}`, person)
                .then((response) => {
                    setNotification(personEditMessageString);
                    navigate('/personnel');
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422){
                        setErrors(response.data.errors);
                        return;
                    }
                    setNotification(errorMessageString);
                    console.log(error);
                });
        } else{
            axiosClient.post(`/personnel`, person)
                .then((response) => {
                    setNotification(personCreateMessageString);
                    debugger;
                    navigate('/personnel');
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422){
                        setErrors(response.data.errors);
                        return;
                    }
                    setNotification(errorMessageString);
                    console.log(error);
                });
        }
    }

    return (
        <div className="container">
            <div className="row py-2 align-items-center justify-content-center">
                <div className="centering col-lg-6" id="form-header">
                    {person.id ? <h1>Edit person: {person.name}</h1> : <h1>Add new person</h1>}
                </div>
            </div>
            <div className="row py-2 align-items-center justify-content-center">
                <div className="centering col-lg-6">
                    <Link className="btn btn-outline-primary link" to={'/'}>Go Back</Link>
                </div>
            </div>
            <div className="row py-2 align-items-center">
                {loading && <div className="text-center">Loading...</div>}
                {errors && <div>
                    {Object.keys(errors).map((key) => (
                        <p className="text-danger" key={key}>{errors[key][0]}</p>
                    ))
                    }
                </div>}
                <div className="form-min-size">
                    {!loading && <form onSubmit={onSubmit}>
                        <label className="form-label" htmlFor="inputName">Name</label>
                        <input id="inputName" className="form-control" type="text" value={person.name}
                               onChange={event => setPerson({...person, name: event.target.value})} placeholder="Name"/>
                        <label className="form-label" htmlFor="inputAge">Age</label>
                        <input id="inputAge" className="form-control" type="number" value={person.age}
                               onChange={event => setPerson({...person, age: event.target.value})} placeholder="18"/>
                        <div id="ageHelpBlock" className="form-text">
                            In range from 1 to 100.
                        </div>
                        <label className="form-label" htmlFor="inputGender">Gender</label>
                        <input id="inputGender" className="form-control" type="text" value={person.gender}
                               onChange={event => setPerson({...person, gender: event.target.value})} placeholder="male"/>
                        <div id="genderHelpBlock" className="form-text">
                            Can be either "male" or "female".
                        </div>
                        <div className="centering">
                            <button className="btn btn-outline-primary" type="submit">Submit</button>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    );
}
