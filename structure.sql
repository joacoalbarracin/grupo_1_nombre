-- User Categories
CREATE TABLE `user_category` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(50) NOT NULL
);

-- Images
CREATE TABLE `images` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `extension` VARCHAR(10) NOT NULL,
    `title` VARCHAR(255) NOT NULL
);

-- Product Categories
CREATE TABLE `product_categories` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoryName` VARCHAR(50) NOT NULL,
    `categoryDescription` TEXT NOT NULL
);

-- Users
CREATE TABLE `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `userCategoryId` INT UNSIGNED NOT NULL,
    CONSTRAINT `users_email_unique` UNIQUE (`email`),
    CONSTRAINT `fk_users_user_category` FOREIGN KEY (`userCategoryId`) REFERENCES `user_category`(`id`)
);

-- Products
CREATE TABLE `products` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productName` TEXT NOT NULL,
    `productDescription` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `discount` INT NOT NULL,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `maximumCapacity` INT NOT NULL,
    `duration` INT NOT NULL,
    `imagesId` INT UNSIGNED NOT NULL,
    `productCategory` INT UNSIGNED NOT NULL,
    CONSTRAINT `fk_products_images` FOREIGN KEY (`imagesId`) REFERENCES `images`(`id`),
    CONSTRAINT `fk_products_product_category` FOREIGN KEY (`productCategory`) REFERENCES `product_categories`(`id`)
);

-- Purchases
CREATE TABLE `purchases` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `address` VARCHAR(255) NOT NULL,
    `deliveryDate` DATE NOT NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `unitQuantity` INT NOT NULL,
    `userId` INT UNSIGNED NOT NULL,
    `productId` INT UNSIGNED NOT NULL,
    CONSTRAINT `fk_purchases_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
    CONSTRAINT `fk_purchases_products` FOREIGN KEY (`productId`) REFERENCES `products`(`id`)
);
