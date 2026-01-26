-- Create the projects storage bucket
-- Note: Run this as the service role in Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'projects',
  'projects', 
  true,
  52428800, -- 50MB in bytes
  ARRAY['image/*', 'video/*']
)
ON CONFLICT (id) DO NOTHING;
