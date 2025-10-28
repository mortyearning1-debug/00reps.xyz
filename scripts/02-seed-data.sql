-- Insert sample agents
INSERT INTO agents (name, description, rating, contact_info) VALUES
  ('PandaBuy', 'Reliable agent with fast shipping', 4.8, 'contact@pandabuy.com'),
  ('WeGoBuy', 'Popular agent with good customer service', 4.6, 'support@wegobuy.com'),
  ('CSSBuy', 'Budget-friendly option', 4.5, 'help@cssbuy.com'),
  ('Superbuy', 'Established agent with quality control', 4.7, 'service@superbuy.com')
ON CONFLICT DO NOTHING;

-- Insert sample currencies
INSERT INTO currencies (code, name, symbol, exchange_rate) VALUES
  ('USD', 'US Dollar', '$', 1.0),
  ('EUR', 'Euro', '€', 0.92),
  ('GBP', 'British Pound', '£', 0.79),
  ('CNY', 'Chinese Yuan', '¥', 7.24),
  ('RUB', 'Russian Ruble', '₽', 92.50)
ON CONFLICT (code) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, brand) VALUES
  ('Classic Logo Hoodie', 'Premium quality hoodie with embroidered logo', 89.99, '/placeholder.svg?height=400&width=400', 'Hoodies', 'Supreme'),
  ('Leather Crossbody Bag', 'Genuine leather bag with adjustable strap', 159.99, '/placeholder.svg?height=400&width=400', 'Bags', 'Louis Vuitton'),
  ('Vintage Denim Jacket', 'Classic denim jacket with distressed finish', 129.99, '/placeholder.svg?height=400&width=400', 'Jackets', 'Levi''s'),
  ('Running Sneakers', 'Comfortable sneakers for everyday wear', 199.99, '/placeholder.svg?height=400&width=400', 'Shoes', 'Nike'),
  ('Wool Beanie', 'Warm winter beanie with fold-up cuff', 29.99, '/placeholder.svg?height=400&width=400', 'Heatwear', 'Carhartt'),
  ('Gold Chain Necklace', '18k gold plated chain necklace', 79.99, '/placeholder.svg?height=400&width=400', 'Jewerely', 'Cartier'),
  ('Cargo Pants', 'Tactical cargo pants with multiple pockets', 89.99, '/placeholder.svg?height=400&width=400', 'Pants', 'Stone Island'),
  ('Graphic T-Shirt', 'Cotton t-shirt with screen printed graphic', 39.99, '/placeholder.svg?height=400&width=400', 'T-Shirts', 'Off-White'),
  ('Zip-Up Hoodie', 'Full zip hoodie with kangaroo pockets', 99.99, '/placeholder.svg?height=400&width=400', 'Zip Hoodies', 'Nike'),
  ('Leather Wallet', 'Bifold wallet with card slots', 69.99, '/placeholder.svg?height=400&width=400', 'Wallets', 'Gucci'),
  ('Puffer Vest', 'Lightweight puffer vest for layering', 119.99, '/placeholder.svg?height=400&width=400', 'Vests', 'The North Face'),
  ('Athletic Shorts', 'Breathable shorts for sports', 49.99, '/placeholder.svg?height=400&width=400', 'Shorts', 'Adidas'),
  ('Crewneck Sweater', 'Classic crewneck in soft cotton', 79.99, '/placeholder.svg?height=400&width=400', 'Sweaters', 'Ralph Lauren'),
  ('Jogger Sweatpants', 'Comfortable joggers with elastic waistband', 69.99, '/placeholder.svg?height=400&width=400', 'Sweatpants', 'Champion'),
  ('Sunglasses', 'Polarized sunglasses with UV protection', 149.99, '/placeholder.svg?height=400&width=400', 'Accessories', 'Ray-Ban'),
  ('Baseball Cap', 'Adjustable baseball cap with embroidered logo', 34.99, '/placeholder.svg?height=400&width=400', 'Accessories', 'New Era')
ON CONFLICT DO NOTHING;
