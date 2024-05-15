-- creation de la base de donnée
CREATE DATABASE projetReact;

------------------------------------

-- utilisation de la base de donnée
USE projetReact;

------------------------------------

-- creation de la table Medecin
CREATE TABLE Medecin(numed INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nom VARCHARE(15), nombre de jour INT, taux journalier INT, prestation INT);

-------------------------------------

-- affichage des donnée dans un tableau, modification et suppression
SELECT nom, nombre de jour, taux journalier, prestation FROM Medecin; 

UPDATE nom /*ou nombre de jour ou taux journalier ou prestation*/ FROM Medecin WHERE numed = /*numed selectionée*/;

DELETE nom /*ou nombre de jour ou taux journalier ou prestation*/ FROM Medecin WHERE numed = /*numed selectionée*/;

-------------------------------------

-- affichage en bas du prestation total,minimal et maximal des medecins en bas du tableau
SELECT prestation,MIN(prestation),MAX(prestation) FROM Medecin;

-------------------------------------

--Histogramme

-------------------------------------


