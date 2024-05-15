<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    
    include 'DbConnect.php';
    $ObjDb = new DbConnect;
    $conn = $ObjDb->connect();
    
   
    $methode = $_SERVER['REQUEST_METHOD'];
    switch($methode){

        case "GET":
            $sql = "SELECT*FROM medecin";
            
            $path = explode('/', $_SERVER['REQUEST_URI']);

            if(isset($path[6]) && is_numeric($path[6])){

                $sql .= " WHERE numed = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[6]);
                $stmt->execute();
                $users = $stmt->fetch(PDO::FETCH_ASSOC);

            }else{
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
           
            echo json_encode($users);
            break;

        case "POST":
            $user = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO medecin(numed, nom, nbr_jours, taux_journalier) VALUES(null, :nom, :nbr_jours, :taux_journalier)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':nom', $user->nom);
            $stmt->bindParam(':nbr_jours', $user->nbr_jours);
            $stmt->bindParam(':taux_journalier', $user->taux_journalier);
            $stmt->bindParam(':taux_journalier', $user->taux_journalier);

            if($stmt->execute()){
                $response = ['status' => 1, 'message' => 'Records created successfuly !'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create records !'];
            }
            echo json_encode($response);
            break;

            case "PUT":
                $user = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE  medecin SET nom =:nom, nbr_jours =:nbr_jours, taux_journalier =:taux_journalier WHERE numed =:id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $user->numed);
                $stmt->bindParam(':nom', $user->nom);
                $stmt->bindParam(':nbr_jours', $user->nbr_jours);
                $stmt->bindParam(':taux_journalier', $user->taux_journalier);
    
                if($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Records updated successfuly !'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update records !'];
                }
                echo json_encode($response);
                break;

            case "DELETE":
                $sql = "DELETE FROM medecin WHERE numed = :id";
                $path = explode('/', $_SERVER['REQUEST_URI']);

                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[6]);
                
                if($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Records deleted successfuly !'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete records !'];
                }
                echo json_encode($response);
                break;
                
    }
?>