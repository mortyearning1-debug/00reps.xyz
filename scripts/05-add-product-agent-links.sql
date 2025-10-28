-- Add columns for agent links and product variants
ALTER TABLE products
ADD COLUMN IF NOT EXISTS acbuy_link TEXT,
ADD COLUMN IF NOT EXISTS cnfans_link TEXT,
ADD COLUMN IF NOT EXISTS mycnbox_link TEXT,
ADD COLUMN IF NOT EXISTS kakobuy_link TEXT,
ADD COLUMN IF NOT EXISTS colors TEXT[], -- Array of available colors
ADD COLUMN IF NOT EXISTS sizes TEXT[]; -- Array of available sizes

-- Update existing products to have default empty arrays
UPDATE products
SET colors = ARRAY[]::TEXT[],
    sizes = ARRAY[]::TEXT[]
WHERE colors IS NULL OR sizes IS NULL;
