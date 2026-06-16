CREATE TABLE quote_line_items (
    id UUID PRIMARY KEY,

    quote_id UUID NOT NULL REFERENCES quotes(id),

    item_name VARCHAR(150) NOT NULL,
    description TEXT,

    quantity NUMERIC(10, 2) NOT NULL DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL,
    line_total NUMERIC(12, 2) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);