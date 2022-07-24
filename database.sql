DROP DATABASE IF EXISTS `dhaunters`;
CREATE DATABASE IF NOT EXISTS `dhaunters`;
USE `dhaunters`;

SET time_zone = "+00:00";

CREATE TABLE `universes`(
	`universe_id` SMALLINT(6) AUTO_INCREMENT PRIMARY KEY,
	`universe` VARCHAR(100) UNIQUE NOT NULL
) ENGINE=INNODB;

CREATE TABLE `tiers`(
	`tier_id` SMALLINT(6) AUTO_INCREMENT PRIMARY KEY,
	`value` VARCHAR(20) UNIQUE NOT NULL
) ENGINE=INNODB;

CREATE TABLE `products`(
	`product_id` SMALLINT(10) AUTO_INCREMENT PRIMARY KEY,
	`universe_id` SMALLINT(10) NOT NULL,
	`tier_id` SMALLINT(6) NOT NULL,
	`name` VARCHAR(100) NOT NULL,
	`short_desc` VARCHAR(255) NOT NULL,
	`long_desc` TEXT NOT NULL,
	`price` FLOAT NOT NULL,
	`image` VARCHAR(400) NOT NULL,
	`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	`deleted` TINYINT(1) DEFAULT 0 NOT NULL,
	FOREIGN KEY (`universe_id`) REFERENCES universes(`universe_id`),
	FOREIGN KEY (`tier_id`) REFERENCES tiers(`tier_id`)
) ENGINE=INNODB;

CREATE TABLE `users`(
	`user_id` SMALLINT(10) AUTO_INCREMENT PRIMARY KEY,
	`admin` TINYINT(1) DEFAULT 0 NOT NULL,
	`first_name` VARCHAR(100) NOT NULL,
	`last_name` VARCHAR(100) NOT NULL,
	`user_name` VARCHAR(100) UNIQUE NOT NULL,
	`email` VARCHAR(255) UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`image` VARCHAR(400) DEFAULT '/img/avatars/default.jpg' NOT NULL,
	`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	`terms_conditions` TINYINT(1) DEFAULT 1 NOT NULL,
	`email_send` TINYINT(1) DEFAULT 0 NOT NULL,
	`deleted` TINYINT(1) DEFAULT 0 NOT NULL
) ENGINE=INNODB;

CREATE TABLE `addresses`(
	`address_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`country` VARCHAR(100) NOT NULL,
	`state` VARCHAR(100) NOT NULL,
	`city` VARCHAR(100) NOT NULL,
	`address` VARCHAR(100) NOT NULL,
	`address_number` SMALLINT(12) NOT NULL,
	`floor` SMALLINT(10) DEFAULT 0,
	`apartment` SMALLINT(10) DEFAULT 0,
	`postal_code` SMALLINT(10) NOT NULL
) ENGINE=INNODB;

CREATE TABLE `users_addresses` (
	`user_address_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`user_id` SMALLINT(10) NOT NULL,
	`address_id` SMALLINT(12) NOT NULL,
	`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	`deleted` SMALLINT(1) DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
	FOREIGN KEY (`address_id`) REFERENCES addresses(`address_id`)
) ENGINE=INNODB;

CREATE TABLE `orders`(
	`order_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`user_address_id` SMALLINT(10) NOT NULL,
	`amount_total` FLOAT NOT NULL,
	`order_date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_address_id`) REFERENCES users_addresses(`user_address_id`)
) ENGINE=INNODB;

CREATE TABLE `order_details`(
	`order_id` SMALLINT(12) NOT NULL,
	`order_detail_id` SMALLINT(14) NOT NULL,
	`product_id` SMALLINT(12) NOT NULL,
	`quantity` SMALLINT(8) NOT NULL DEFAULT 1,
	`amount` FLOAT NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES orders(`order_id`),
	FOREIGN KEY (`product_id`) REFERENCES products(`product_id`)
) ENGINE=INNODB;

CREATE TABLE `user_favourites`(
	`user_favourite_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`user_id` SMALLINT(10) NOT NULL,
	`product_id` SMALLINT(10) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
	FOREIGN KEY (`product_id`) REFERENCES products(`product_id`)
)	ENGINE=INNODB;

CREATE TABLE `belongings`(
	`belonging_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`user_id` SMALLINT(10) NOT NULL,
	`product_id` SMALLINT(10) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
	FOREIGN KEY (`product_id`) REFERENCES products(`product_id`)
) ENGINE=INNODB;

INSERT INTO `universes` (`universe`) VALUES ('Pokemon'),('Dragon Ball'),('Marvel');

INSERT INTO `tiers` (`value`) VALUES ('Common'),('Uncommon'),('Rare'),('Epic'),('Legendary');

INSERT INTO `products`(`universe_id`, `tier_id`,`name`,`short_desc`,`long_desc`,`price`,`image`,`created_at`,`updated_at`) VALUES ('1','5','Pikachu Gorra','Un fiel compañero Pokemon de tipo eléctrico.', 'Un fiel compañero Pokemon de tipo eléctrico, el cuál es el compañero del protagonista del anime, Ash Ketchup, y lo podemos ver con la gorra del mismo en la imágen de esta edición especial de lanzamiento la tarjeta.','99.99','/img/pokemon/5/pikachugorra.png','2022/03/10 15:53:10','2022/03/10 15:53:10');

INSERT INTO `users` ( `admin`, `first_name`, `last_name`, `user_name`, `email`, `password`, `image`, `terms_conditions`, `email_send`, `deleted`) VALUES ( '1', 'Admin', 'Istrator', 'Administrator', 'administrator@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.png', '1', '0', '0'), ('1', 'Nicolás', 'Barragán', 'NicoB', 'nicobarragan@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.png', '1', '0', '0'), ('1', 'Diego', 'Giraldo', 'DiegoG', 'diegogiraldo@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.png', '1', '0', '0'), ('1', 'Matias', 'Torres Contreras', 'MatiTC', 'matiastc@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.png', '1', '0', '0'), ('1', 'Anthony', 'Micha', 'AnthonyM', 'anthonymicha@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.png', '1', '0', '0');
-- La contraseña de los usuarios por defecto es hola1234
