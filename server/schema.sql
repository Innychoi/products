
\c products
DROP TABLE if exists product, features, styles, photos, skus, related;

CREATE TABLE product (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(100) NULL DEFAULT NULL,
  slogan VARCHAR(150) NULL DEFAULT NULL,
  description VARCHAR NULL DEFAULT NULL,
  category VARCHAR(100) NULL DEFAULT NULL,
  default_price INTEGER NULL DEFAULT NULL
);

-- DROP TABLE IF EXISTS `features`;

CREATE TABLE features (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  feature VARCHAR(100) NULL DEFAULT NULL,
  value VARCHAR(100) NULL DEFAULT NULL
);

-- DROP TABLE IF EXISTS `styles`;

CREATE TABLE styles (
  id INTEGER NOT NULL PRIMARY KEY,
  productId INTEGER NULL DEFAULT NULL,
  name VARCHAR(100) NULL DEFAULT NULL,
  sale_price INTEGER NULL DEFAULT NULL,
  original_price INTEGER NULL DEFAULT NULL,
  "default?" BOOLEAN NULL DEFAULT NULL
);

-- DROP TABLE IF EXISTS `photos`;

CREATE TABLE photos (
  id INTEGER NOT NULL PRIMARY KEY,
  styleId INTEGER NULL DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  thumbnail_url VARCHAR NULL DEFAULT NULL
);

-- DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id INTEGER NOT NULL PRIMARY KEY,
  styleId INTEGER NULL DEFAULT NULL,
  size VARCHAR(10) NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL
);

-- DROP TABLE IF EXISTS `relatedProducts`;

CREATE TABLE related (
  id INTEGER NULL PRIMARY KEY DEFAULT NULL,
  current_product_id INTEGER NULL DEFAULT NULL,
  related_product_id INTEGER NULL DEFAULT NULL
);

\copy product FROM 'server/csv/product.csv' DELIMITER ',' CSV header;
\copy features FROM 'server/csv/features.csv' DELIMITER ',' CSV header;
\copy styles FROM 'server/csv/styles.csv' DELIMITER ',' null as 'null' CSV header;
\copy photos FROM 'server/csv/photos.csv' DELIMITER ',' CSV header;
\copy skus FROM 'server/csv/skus.csv' DELIMITER ',' CSV header;
\copy related FROM 'server/csv/related.csv' DELIMITER ',' CSV header;