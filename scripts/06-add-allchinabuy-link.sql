-- Add allchinabuy_link column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS allchinabuy_link TEXT;

-- Add comment
COMMENT ON COLUMN products.allchinabuy_link IS 'Link to product on AllChinaBuy agent platform';
