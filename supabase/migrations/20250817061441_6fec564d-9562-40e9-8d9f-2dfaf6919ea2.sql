-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table to manage admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Create RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update roles" 
ON public.user_roles 
FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (public.is_admin());

-- Create secure SELECT policy for leads table (only admins can view lead data)
CREATE POLICY "Only admins can view leads" 
ON public.leads 
FOR SELECT 
USING (public.is_admin());

-- Create UPDATE policy for leads (only admins can update)
CREATE POLICY "Only admins can update leads" 
ON public.leads 
FOR UPDATE 
USING (public.is_admin());

-- Create DELETE policy for leads (only admins can delete)
CREATE POLICY "Only admins can delete leads" 
ON public.leads 
FOR DELETE 
USING (public.is_admin());

-- Insert an admin user role for the first user (you'll need to update this with your actual user ID)
-- This is commented out - you'll need to manually add admin role via SQL editor after authentication is set up
-- INSERT INTO public.user_roles (user_id, role) VALUES ('your-user-id-here', 'admin');