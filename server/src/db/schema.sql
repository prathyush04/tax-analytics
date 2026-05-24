CREATE TABLE IF NOT EXISTS properties (
  property_id       VARCHAR(50) PRIMARY KEY,
  tenant            VARCHAR(100),
  owner_name        VARCHAR(255),
  property_type     VARCHAR(100),
  ward              VARCHAR(100),
  area_sqft         INTEGER,
  status            VARCHAR(50),
  annual_tax_inr    NUMERIC(12,2),
  collection_inr    NUMERIC(12,2),
  registration_date DATE,
  floor_count       INTEGER,
  address           TEXT
);
