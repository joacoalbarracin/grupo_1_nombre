DROP DATABASE IF EXISTS adventureba;
CREATE DATABASE adventureba;

USE adventureba;

CREATE TABLE `productCategories`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoryName` TEXT NOT NULL,
    `categoryDescription` TEXT NOT NULL
);
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` TEXT NOT NULL,
    `lastName` TEXT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `userCategoryId` BIGINT UNSIGNED NOT NULL,
    `image` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);
CREATE TABLE `products`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productName` TEXT NOT NULL,
    `productDescription` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `discount` BIGINT NOT NULL,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `maximumCapacity` BIGINT NOT NULL,
    `duration` BIGINT NOT NULL,
    `productCategory` BIGINT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `deleted_at` DATETIME NOT NULL
);
CREATE TABLE `userCategory`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(255) NOT NULL
);
CREATE TABLE `purchases`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `adress` VARCHAR(255) NOT NULL,
    `deliveryDate` DATE NOT NULL,
    `totalPrice` DECIMAL(8, 2) NOT NULL,
    `unitCuantity` BIGINT NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `products_purchases`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `purchase_id` BIGINT UNSIGNED NOT NULL,
    `precio` BIGINT NOT NULL,
    `cantidad` BIGINT NOT NULL
);
ALTER TABLE
    `products_purchases` ADD CONSTRAINT `products_purchases_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`);
ALTER TABLE
    `products_purchases` ADD CONSTRAINT `products_purchases_purchase_id_foreign` FOREIGN KEY(`purchase_id`) REFERENCES `purchases`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_usercategoryid_foreign` FOREIGN KEY(`userCategoryId`) REFERENCES `userCategory`(`id`);
ALTER TABLE
    `purchases` ADD CONSTRAINT `purchases_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `users`(`id`);
ALTER TABLE
    `productCategories` ADD CONSTRAINT `productcategories_id_foreign` FOREIGN KEY(`id`) REFERENCES `products`(`id`);