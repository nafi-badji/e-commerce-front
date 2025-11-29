-- Script de mise à jour de la table products
-- Ajouter les champs stock et category si ils n'existent pas

USE ecommerce;

-- Ajouter le champ stock s'il n'existe pas
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS stock INT DEFAULT 10;

-- Ajouter le champ category s'il n'existe pas
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'homme';

-- Mettre à jour les produits existants avec des valeurs par défaut si nécessaire
UPDATE products SET stock = 10 WHERE stock IS NULL;
UPDATE products SET category = 'homme' WHERE category IS NULL OR category = '';

