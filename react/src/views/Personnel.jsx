import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Personnel() {

    const { setNotification } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [personnel, setPersonnel] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFiler] = useState('name');
    const personDeleteMessageString = "Person deleted successfully.";
    const errorMessageString = "Something went wrong :(";

    const onDelete = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")){
            return;
        }
        axiosClient.delete(`/personnel/${user.id}`)
            .then(() => {
                setNotification(personDeleteMessageString);
                getPersonnel();
            })
            .catch((error) => {
                const response = error.response;
                setNotification(errorMessageString);
                setLoading(false);
                console.log(error);
            })

    }
    const getPersonnel = () => {
        setLoading(true);
        axiosClient.get('/personnel')
            .then(({data}) => {
                setPersonnel(data.data);
                setLoading(false);
            })
            .catch((error) => {
                const response = error.response;
                setNotification(errorMessageString);
                setLoading(false);
                console.log(error);
            });
    };

    const onSearch = (e) => {
        e.preventDefault();
        if (!search){
            getPersonnel();
        }
        axiosClient.get(`/personnel/search?${filter}=${search}`)
            .then(({data}) => {
                console.log(data);
                setPersonnel(data.data);
            })
            .catch((error) => {
                const response = error.response;
                setNotification(errorMessageString);
                console.log(error);
            })
    }

    const handleFilterChange = (e) => {
        setFiler(e.target.value);
    };

    useEffect(() => {
        getPersonnel();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col-lg-2">
                    <Link className="btn btn-outline-primary link" to={'/'}>Personnel</Link>
                </div>
                <div className="col-lg-9 p-4">
                    <div className="spread centering">
                        <div className="centering">
                            <div className="text-center px-4">
                                <div className="form-check">
                                    <input type="radio" id="nameFilter" className="form-check-input" name="filter"
                                           value="name"
                                           checked={filter === 'name'} onChange={handleFilterChange}/>
                                    <label className="form-check-label px-2" htmlFor="nameFilter">Name</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" id="ageFilter" className="form-check-input" name="filter"
                                           value="age"
                                           checked={filter === 'age'} onChange={handleFilterChange}/>
                                    <label className="form-check-label px-2" htmlFor="ageFilter">Age</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" id="genderFilter" className="form-check-input" name="filter"
                                           value="gender" checked={filter === 'gender'} onChange={handleFilterChange}/>
                                    <label className="form-check-label px-2" htmlFor="genderFilter">Gender</label>
                                </div>
                            </div>
                            <input value={search} onChange={(ev) => setSearch(ev.target.value)} id="personnel-searchbar"
                                   placeholder="Search"/>
                            <button className="btn btn-outline-primary mx-2" onClick={onSearch}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-1">
                    <Link className="btn btn-outline-primary link" to='/personnel/new'>Add new</Link>
                </div>
            </div>
            <div>
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr className="personnel-table-row">
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    {loading && <tbody>
                    <tr>
                        <td colSpan="5" className="text-center">Loading...</td>
                    </tr>
                    </tbody>}
                    {!loading && <tbody className="table-group-divider">
                    {personnel && personnel.map((person) => (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.name}</td>
                            <td>{person.age}</td>
                            <td>{person.gender}</td>
                            <td>
                                <div className="spread">
                                    <Link className="btn btn-outline-dark" to={'/personnel/' + person.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={(ev) => onDelete(person)} className="btn btn-outline-danger">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>}
                </table>
            </div>
        </div>);
}
