import { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate, useParams, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";

export default function ListUser(){

    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {

        getUser();

    }, []);

    function getUser() {
        axios.get(`http://localhost//PR2/server/user/save/${id}`).then(function(response){
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        Swal.fire({
            // title: 'Confirmation',
            text: 'Voulez-vous vraiment enregistrer cet Modification ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',

        }).then((result)=>{
            if(result.isConfirmed){
                axios.put(`http://localhost//PR2/server/user/${id}/edit`, inputs).then(function(response){
                    console.log(response.data);
                    navigate('/');

                    Swal.fire({
                        // title: 'Information',
                        text: 'Modifications enregistrées avec succes !',
                        icon: 'success',
                    })
                })
            } else if (result.dismiss === Swal.DismissReason.cancel){

            }
        });
    }

    const annuler = () => {
        
        Swal.fire({
            // title: 'Confirmation',
            text: 'Voulez-vous vraiment annuler cet Modification ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',

        }).then((result)=>{
            if(result.isConfirmed){
                    navigate('/');
            } else if (result.dismiss === Swal.DismissReason.cancel){

            }
        });
    }

    return (
      <div className="container py-5">
        <h1></h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
              <label className="form-label">Nom:</label>
              <input type="text" className="form-control" value={inputs.nom}  placeholder="Enter votre nom" name="nom" onChange={handleChange}/>
          </div>
          <div className="mb-3">
              <label  className="form-label">Nombre de jours:</label>
              <input type="number" className="form-control" value={inputs.nbr_jours} placeholder="Entrez votre email" name="nbr_jours" onChange={handleChange}/>
          </div>
          <div className="mb-3">
              <label  className="form-label">Taux journalier:</label>
              <input type="text" className="form-control" value={inputs.taux_journalier}  placeholder="Entrez votre mobil" name="taux_journalier" onChange={handleChange}/>
          </div>
             <Link  onClick={annuler} className="btn btn-warning m-2">Annuler</Link>
             <button  className="btn btn-success m-2">Mettre à jour <i className="fas fa-sync"></i></button>
        </form>
      </div>
    )
}