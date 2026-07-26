ALTER TABLE quotes
ADD COLUMN public_token VARCHAR(96),
ADD COLUMN public_token_expires_at TIMESTAMP,
ADD COLUMN customer_viewed_at TIMESTAMP,
ADD COLUMN approved_at TIMESTAMP,
ADD COLUMN declined_at TIMESTAMP,
ADD COLUMN customer_decision_note TEXT;

CREATE UNIQUE INDEX idx_quotes_public_token
ON quotes(public_token)
WHERE public_token IS NOT NULL;

CREATE INDEX idx_quotes_public_token_expires_at
ON quotes(public_token_expires_at);