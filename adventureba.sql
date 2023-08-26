CREATE TABLE `userCategory`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(255) NOT NULL
);

CREATE TABLE `products`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productName` TEXT NOT NULL,
    `productDescription` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `discount` BIGINT NOT NULL,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `maximunCapacity` BIGINT NOT NULL,
    `duration` BIGINT NOT NULL,
    `imagesId` BIGINT NOT NULL,
    `productCategory` BIGINT NOT NULL
);

ALTER TABLE `products` ADD INDEX `products_imagesid_index`(`imagesId`);
ALTER TABLE `products` ADD INDEX `products_productcategory_index`(`productCategory`);

CREATE TABLE `purchases`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `adress` VARCHAR(255) NOT NULL,
    `deliveryDate` DATE NOT NULL,
    `totalPrice` DECIMAL(8, 2) NOT NULL,
    `unitCuantity` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `productId` BIGINT NOT NULL
);

ALTER TABLE `purchases` ADD INDEX `purchases_userid_index`(`userId`);
ALTER TABLE `purchases` ADD INDEX `purchases_productid_index`(`productId`);

CREATE TABLE `users`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` TEXT NOT NULL,
    `lastName` TEXT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `repeatPassword` VARCHAR(255) NOT NULL,
    `userCategoryId` BIGINT NOT NULL
);

ALTER TABLE `users` ADD UNIQUE `users_email_unique`(`email`);
ALTER TABLE `users` ADD INDEX `users_usercategoryid_index`(`userCategoryId`);

CREATE TABLE `productCategories`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoryName` TEXT NOT NULL,
    `categoryDescription` TEXT NOT NULL
);

CREATE TABLE `images`(
    `id` BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` TEXT NOT NULL,
    `extension` BIGINT NOT NULL,
    `title` TEXT NOT NULL
);

ALTER TABLE `purchases` ADD CONSTRAINT `purchases_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `users`(`id`);
ALTER TABLE `users` ADD CONSTRAINT `users_usercategoryid_foreign` FOREIGN KEY(`userCategoryId`) REFERENCES `userCategory`(`id`);
ALTER TABLE `products` ADD CONSTRAINT `products_imagesid_foreign` FOREIGN KEY(`imagesId`) REFERENCES `images`(`id`);
ALTER TABLE `products` ADD CONSTRAINT `products_productcategory_foreign` FOREIGN KEY(`productCategory`) REFERENCES `productCategories`(`id`);
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_productid_foreign` FOREIGN KEY(`productId`) REFERENCES `products`(`id`);