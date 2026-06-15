CREATE TABLE project_notes (
    id UUID PRIMARY KEY,

    project_id UUID NOT NULL REFERENCES projects(id),

    note_text TEXT NOT NULL,
    created_by VARCHAR(150),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);