import axios from "axios"
import { useEffect, useState } from "react";
import Histogramme from './histo';
import './histo.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net/js/dataTables.min.mjs';
import Swal from "sweetalert2";

// import ReactDOM from "react-dom/client";

export default function ListUser(){

    const [users, setUsers] = useState([]);

    const imgsrc = true;
    const user = true;


    const [totalSum, setTotalsum] = useState(0);

    const [minPrestation, setMinPrestation] = useState(Number.MAX_VALUE);

    const [maxPrestation, setMaxPrestation] = useState(0);

    

    useEffect(() => {
        const {sum ,max, min }= users.reduce((acc, user) => {
            const product = user.taux_journalier * user.nbr_jours;
            const minPres = Math.min(acc.min, product);
            const maxPres = Math.max(acc.max, product);
            return {
                sum: acc.sum + product,
                min: minPres,
                max: maxPres,
            }
        }, {sum: 0, max: 0, min: Number.MAX_VALUE});

        setTotalsum(sum.toFixed(2));
        setMinPrestation(min.toFixed(2));
        setMaxPrestation(max.toFixed(2));

    }, [users, minPrestation, maxPrestation]);

    useEffect(() => {
        getUsers();

    }, []);

    

    function getUsers() {
        axios.get("http://localhost//PR2/server/user/save").then(function(response){
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (numed) => {
        Swal.fire({
            title: 'Voulez-vous vraiment supprimer cet element ?',
            text: 'cette action est irreversible !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Oui,j'en suis sûr !",
            cancelButtonText: 'Cancel',
        }).then((result)=>{
            if(result.isConfirmed){
                axios.delete(`http://localhost//PR2/server/user/save/${numed}/delete`).then(function(response){
                    console.log(response.data);
                    getUsers();

                    
                    Swal.fire({
                        // title: 'Information',
                        text: 'Element supprimées avec succes !',
                        icon: 'success',
                    })
                })
            } else if (result.dismiss === Swal.DismissReason.cancel){

            }
        });
    }

    return(
        <div className="container ">
            <section className="container py-3 mt-2 bg-khaki">
                <div className="dropdown-divider border-warning"></div>
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="fw-bold mb-0">List des Medecins</h2>
                    </div>
                    <div className="col-md-6">
                    <div className="d-flex justify-content-end">
                        <Link to="user/create" className="btn btn-primary btn-sm me-3"><i className="fas fa-folder-plus"></i> Nouveau</Link>
                        {/* <Link className="btn btn-success btn-sm"><i className="fas fa-table"></i> Exporter</Link> */}
                    </div>
                    </div>
                </div>
                <div className="dropdown-divider border-warning"></div>
            </section><br></br>
            <div className="table-responsive" style={{height:300}}>
            <table className="table table-striped  table-sm">
                <thead>
                    <tr>
                        <th className="sticky-top">#</th>
                        <th className="sticky-top">Nom</th>
                        <th className="sticky-top">Nombre de jour</th>
                        <th className="sticky-top">Taux journalier</th>
                        <th className="sticky-top">Prestation</th>
                        <th className="sticky-top">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => {
                         // Déclaration de la variable product
                        const product = (user.taux_journalier * user.nbr_jours).toFixed(2);
                         // Ajouter le produit au total

                        return(<tr key={key}>
                            <td>{user.numed}</td>
                            <td>{user.nom}</td>
                            <td>{user.nbr_jours}</td>
                            <td>{user.taux_journalier}</td>
                            <td>{product}</td>
                            <td>
                                <Link to={`user/${user.numed}/edit`} style={{margin:'10px'}} className="text-primary"><i className="fas fa-edit"></i></Link>
                                <Link  className="text-danger" onClick={()=> deleteUser(user.numed)}><i className="fas fa-trash-alt"></i></Link>
                                
                            </td>
                        </tr>
                        )
                        
                    })}

                </tbody>
            </table>
            </div>
            <div className="d-flex">
            <p className="text-primary m-2" id="pres">Prestation total:{totalSum}</p><br></br>
            <div className="justify-content-center">
            <p className="text-primary m-2" id="pres">Prestation minimal:{minPrestation}</p>
            </div>
            <div className="justify-content-center">
            <p className="text-primary m-2" id="pres">Prestation maximal:{maxPrestation}</p>
            </div>
            </div>
            <h6 className="h2 text-center py-3">Histogramme de prestation</h6>
            <div className="container bg-light" id="histo">
                
                <Histogramme />
            </div>
        </div>

    )
}