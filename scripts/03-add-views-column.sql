-- Add views column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Create index for views
CREATE INDEX IF NOT EXISTS idx_products_views ON products(views);

-- Create policy for updating views
CREATE POLICY "Allow public update views on products" ON products
  FOR UPDATE USING (true)
  WITH CHECK (true);
