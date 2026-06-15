CREATE TABLE projects (
    id UUID PRIMARY KEY,

    lead_id UUID NOT NULL REFERENCES leads(id),

    project_name VARCHAR(150) NOT NULL,
    project_type VARCHAR(150) NOT NULL,

    description TEXT,

    status VARCHAR(50) NOT NULL DEFAULT 'PLANNING',

    estimated_budget NUMERIC(12, 2),
    actual_budget NUMERIC(12, 2),

    start_date DATE,
    target_completion_date DATE,
    completed_date DATE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);