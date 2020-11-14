-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Sam 14 Novembre 2020 à 02:02
-- Version du serveur :  5.7.31-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ReactMuscu`
--

-- --------------------------------------------------------

--
-- Structure de la table `Exercices`
--

CREATE TABLE `Exercices` (
  `ID` int(11) NOT NULL,
  `ID_Session` int(11) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `muscle` varchar(100) DEFAULT NULL,
  `Rest` int(11) DEFAULT NULL,
  `Nbr_Rep` int(11) DEFAULT NULL,
  `Weight` double DEFAULT NULL,
  `IsDeleted` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Structure de la table `Sessions`
--

CREATE TABLE `Sessions` (
  `ID` int(11) NOT NULL,
  `ID_User` int(11) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `IsDeleted` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Structure de la table `TokensApp`
--

CREATE TABLE `TokensApp` (
  `ID` int(11) NOT NULL,
  `CreationDate` date DEFAULT NULL,
  `TokenApp` varchar(200) DEFAULT NULL,
  `IsActive` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `TokensApp`
--

INSERT INTO `TokensApp` (`ID`, `CreationDate`, `TokenApp`, `IsActive`) VALUES
(1, '2020-10-07', 'GoGoMuscuMuscu', 1);

-- --------------------------------------------------------

--
-- Structure de la table `TokenUser`
--

CREATE TABLE `TokenUser` (
  `ID` int(11) NOT NULL,
  `ID_User` int(11) DEFAULT NULL,
  `Token` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date` datetime DEFAULT NULL,
  `IsActive` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `birthday` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Users`
--

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Exercices`
--
ALTER TABLE `Exercices`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Sessions`
--
ALTER TABLE `Sessions`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `TokensApp`
--
ALTER TABLE `TokensApp`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `TokenUser`
--
ALTER TABLE `TokenUser`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Exercices`
--
ALTER TABLE `Exercices`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `Sessions`
--
ALTER TABLE `Sessions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT pour la table `TokensApp`
--
ALTER TABLE `TokensApp`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `TokenUser`
--
ALTER TABLE `TokenUser`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
