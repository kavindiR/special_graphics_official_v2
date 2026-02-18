-- Special Graphics Database Schema
-- PostgreSQL Database Schema for dev.specialgraphics.us
-- Run this file to create all tables manually (alternative to Sequelize sync)

-- Enable UUID extension if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'designer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE designer_level AS ENUM ('entry', 'mid', 'top');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE contest_status AS ENUM ('open', 'qualifying', 'final_round', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('open', 'invited', 'in_progress', 'review', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE earnings_type AS ENUM ('contest_win', 'project_payment', 'bonus', 'refund');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE earnings_status AS ENUM ('pending', 'processing', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS contest_submissions CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS earnings CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS designs CASCADE;
DROP TABLE IF EXISTS contests CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    avatar VARCHAR(500) DEFAULT '',
    bio TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    designer_level designer_level DEFAULT 'entry',
    rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    total_earnings DECIMAL(10, 2) DEFAULT 0,
    contests_won INTEGER DEFAULT 0,
    total_submissions INTEGER DEFAULT 0,
    portfolio_views INTEGER DEFAULT 0,
    skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    location VARCHAR(255),
    website VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Contests table
CREATE TABLE contests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    prize DECIMAL(10, 2) NOT NULL CHECK (prize >= 0),
    client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status contest_status NOT NULL DEFAULT 'open',
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    requirements TEXT NOT NULL,
    style_preferences TEXT[] DEFAULT ARRAY[]::TEXT[],
    color_preferences TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Contest Submissions table
CREATE TABLE contest_submissions (
    id SERIAL PRIMARY KEY,
    contest_id INTEGER NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    designer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    description TEXT,
    is_winner BOOLEAN NOT NULL DEFAULT false,
    is_finalist BOOLEAN NOT NULL DEFAULT false,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(contest_id, designer_id)
);

-- Create Designs table
CREATE TABLE designs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    designer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    designer_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500) NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    tools VARCHAR(255) NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    liked_by INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Portfolios table
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    designer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(255) NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    views INTEGER NOT NULL DEFAULT 0,
    likes INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    designer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    budget DECIMAL(10, 2) NOT NULL CHECK (budget >= 0),
    status project_status NOT NULL DEFAULT 'open',
    deadline TIMESTAMP WITH TIME ZONE,
    requirements TEXT NOT NULL,
    deliverables TEXT[] DEFAULT ARRAY[]::TEXT[],
    style_preferences TEXT[] DEFAULT ARRAY[]::TEXT[],
    color_preferences TEXT[] DEFAULT ARRAY[]::TEXT[],
    related_contest_id INTEGER REFERENCES contests(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Earnings table
CREATE TABLE earnings (
    id SERIAL PRIMARY KEY,
    designer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contest_id INTEGER REFERENCES contests(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    type earnings_type NOT NULL,
    status earnings_status NOT NULL DEFAULT 'pending',
    description TEXT,
    transaction_id VARCHAR(255),
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contest_id INTEGER REFERENCES contests(id) ON DELETE SET NULL,
    subject VARCHAR(200),
    content TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_contests_client_id ON contests(client_id);
CREATE INDEX idx_contests_status ON contests(status);
CREATE INDEX idx_contests_category ON contests(category);
CREATE INDEX idx_contest_submissions_contest_id ON contest_submissions(contest_id);
CREATE INDEX idx_contest_submissions_designer_id ON contest_submissions(designer_id);
CREATE INDEX idx_designs_designer_id ON designs(designer_id);
CREATE INDEX idx_designs_tags ON designs USING GIN(tags);
CREATE INDEX idx_portfolios_designer_id ON portfolios(designer_id);
CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_portfolios_tags ON portfolios USING GIN(tags);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_designer_id ON projects(designer_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_earnings_designer_id ON earnings(designer_id);
CREATE INDEX idx_earnings_status ON earnings(status);
CREATE INDEX idx_earnings_type ON earnings(type);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_contest_id ON messages(contest_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contests_updated_at BEFORE UPDATE ON contests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contest_submissions_updated_at BEFORE UPDATE ON contest_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_designs_updated_at BEFORE UPDATE ON designs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_earnings_updated_at BEFORE UPDATE ON earnings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (password: admin123 - CHANGE THIS!)
-- Password hash for 'admin123' using bcrypt (rounds: 10)
-- You should generate your own password hash
INSERT INTO users (name, email, password, role, is_verified) 
VALUES ('Admin User', 'admin@specialgraphics.us', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'admin', true)
ON CONFLICT (email) DO NOTHING;

-- Comments
COMMENT ON TABLE users IS 'Stores user accounts including clients, designers, and admins';
COMMENT ON TABLE contests IS 'Stores design contest information';
COMMENT ON TABLE contest_submissions IS 'Stores designer submissions for contests';
COMMENT ON TABLE designs IS 'Stores design showcase items';
COMMENT ON TABLE portfolios IS 'Stores designer portfolio items';
COMMENT ON TABLE projects IS 'Stores project information for direct client-designer collaborations';
COMMENT ON TABLE earnings IS 'Stores designer earnings and payment records';
COMMENT ON TABLE messages IS 'Stores messages between users';

