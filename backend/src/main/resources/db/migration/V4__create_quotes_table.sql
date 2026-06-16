CREATE TABLE quotes (
    id UUID PRIMARY KEY,

    project_id UUID NOT NULL REFERENCES projects(id),

    title VARCHAR(150) NOT NULL,
    description TEXT,

    estimated_labor_cost NUMERIC(12, 2),
    estimated_material_cost NUMERIC(12, 2),
    additional_costs NUMERIC(12, 2),
    total_amount NUMERIC(12, 2) NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT',

    valid_until DATE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);