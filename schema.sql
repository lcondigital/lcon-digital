-- LCON DIGITAL website database
-- Retention is enforced by the application at 90 days.

CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  ip TEXT NOT NULL,
  country TEXT,
  city TEXT,
  region TEXT,
  timezone TEXT,
  path TEXT NOT NULL,
  language TEXT,
  referrer TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_ip_path_created ON page_views(ip, path, created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  ip TEXT NOT NULL,
  country TEXT,
  city TEXT,
  region TEXT,
  email_status TEXT NOT NULL DEFAULT 'received'
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_ip_created ON contacts(ip, created_at);
