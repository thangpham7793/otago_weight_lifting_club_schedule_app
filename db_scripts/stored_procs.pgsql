CREATE OR REPLACE FUNCTION instructor_login(given_email TEXT)
RETURNS TEXT 
LANGUAGE plpgsql
AS
$$
DECLARE 
    result TEXT;
BEGIN
    SELECT i.email INTO result
    FROM instructor i;
    
    RETURN result;
END;
$$; 