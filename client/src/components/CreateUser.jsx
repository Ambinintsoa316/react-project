import { useState } from "react";
import Axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";

export default function ListUser(){

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
                Axios.post("http://localhost//PR2/server/user/save", inputs).then(function(response){
                    console.log(response.data);
                    navigate('/');
                    Swal.fire({
                        title: 'Information',
                        text: 'Elements enregistrées avec succes !',
                        icon: 'success',
                    })
                })     

        
    }

    const annuler = () => {
        
        Swal.fire({
            // title: 'Confirmation',
            text: 'Voulez-vous vraiment annuler cet Modification ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Oui,j'en suis sûr !",
            cancelButtonText: 'Cancel',

        }).then((result)=>{
            if(result.isConfirmed){
                    navigate('/');
            } else if (result.dismiss === Swal.DismissReason.cancel){

            }
        });
    }

    return (
      <div className="container py-5">
        <h1 className="text-center">Ajout de medecin</h1>

        <form onSubmit={handleSubmit}>
          <div class="mb-3 mt-3">
              <label  className="form-label">Nom:</label>
              <input type="text" className="form-control"  placeholder="Enter votre nom" name="nom" onChange={handleChange}/>
          </div>
          <div class="mb-3">
              <label  className="form-label">Nombres de jours:</label>
              <input type="number" className="form-control"  placeholder="Entrez le nombre de jours" name="nbr_jours" onChange={handleChange}/>
          </div>
          <div class="mb-3">
              <label  className="form-label">taux journalier:</label>
              <input type="text" className="form-control"  placeholder="Entrez le taux journalier" name="taux_journalier" onChange={handleChange}/>
          </div>
             <Link onClick={annuler} className="btn btn-warning m-2">Annuler</Link>
             <button  className="btn btn-success m-2 ">Ajouter <i className="fas fa-plus"></i></button>
        </form>
      </div>
    )
}