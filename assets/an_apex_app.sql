-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mer. 11 déc. 2019 à 11:21
-- Version du serveur :  10.1.38-MariaDB
-- Version de PHP :  7.3.2

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `an_apex_app`
--

-- --------------------------------------------------------

--
-- Structure de la table `apex_profile`
--

CREATE TABLE `apex_profile`
(
  `id_apex_profile` int
(10) UNSIGNED NOT NULL,
  `pseudo` varchar
(70) NOT NULL,
  `platform` varchar
(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `game_sessions`
--

CREATE TABLE `game_sessions`
(
  `id_game_session` int
(10) UNSIGNED NOT NULL,
  `name` varchar
(70) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON
UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `session_players`
--

CREATE TABLE `session_players`
(
  `id_user_has_profile` int
(10) UNSIGNED NOT NULL,
  `id-session-player` int
(10) NOT NULL,
  `id_game_session` int
(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users`
(
  `id_user` int
(10) UNSIGNED NOT NULL,
  `username` varchar
(70) NOT NULL,
  `email` varchar
(70) NOT NULL,
  `password` varchar
(70) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON
UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user_has_profile`
--

CREATE TABLE `user_has_profile`
(
  `id_user_has_profile` int
(10) UNSIGNED NOT NULL,
  `id_apex_profile` int
(10) UNSIGNED NOT NULL,
  `id_user` int
(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `apex_profile`
--
ALTER TABLE `apex_profile`
ADD PRIMARY KEY
(`id_apex_profile`);

--
-- Index pour la table `game_sessions`
--
ALTER TABLE `game_sessions`
ADD PRIMARY KEY
(`id_game_session`);

--
-- Index pour la table `session_players`
--
ALTER TABLE `session_players`
ADD PRIMARY KEY
(`id-session-player`),
ADD KEY `fkIdx_344`
(`id_user_has_profile`),
ADD KEY `fkIdx_347`
(`id_game_session`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY
(`id_user`);

--
-- Index pour la table `user_has_profile`
--
ALTER TABLE `user_has_profile`
ADD PRIMARY KEY
(`id_user_has_profile`),
ADD KEY `fkIdx_324`
(`id_user`),
ADD KEY `fkIdx_333`
(`id_apex_profile`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `apex_profile`
--
ALTER TABLE `apex_profile`
  MODIFY `id_apex_profile` int
(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `game_sessions`
--
ALTER TABLE `game_sessions`
  MODIFY `id_game_session` int
(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int
(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user_has_profile`
--
ALTER TABLE `user_has_profile`
  MODIFY `id_user_has_profile` int
(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `session_players`
--
ALTER TABLE `session_players`
ADD CONSTRAINT `FK_344` FOREIGN KEY
(`id_user_has_profile`) REFERENCES `user_has_profile`
(`id_user_has_profile`),
ADD CONSTRAINT `FK_347` FOREIGN KEY
(`id_game_session`) REFERENCES `game_sessions`
(`id_game_session`);

--
-- Contraintes pour la table `user_has_profile`
--
ALTER TABLE `user_has_profile`
ADD CONSTRAINT `FK_324` FOREIGN KEY
(`id_user`) REFERENCES `users`
(`id_user`),
ADD CONSTRAINT `FK_333` FOREIGN KEY
(`id_apex_profile`) REFERENCES `apex_profile`
(`id_apex_profile`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
