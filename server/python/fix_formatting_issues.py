def fix_formatting_issues(df):
    # Apply to all string/object columns
    for col in df.select_dtypes(include='object').columns:
        # Trim whitespace
        df[col] = df[col].astype(str).str.strip()
        
        # Normalize common date formats
        try:
            parsed_dates = pd.to_datetime(df[col], errors='coerce')
            if parsed_dates.notnull().sum() > 0:
                df[col] = parsed_dates
        except:
            pass

        # Convert to lowercase if column likely categorical (e.g., < 30 unique values)
        if df[col].nunique() < 30:
            df[col] = df[col].str.lower()

        # Replace common junk characters from strings
        df[col] = df[col].str.replace(r'[^A-Za-z0-9\s\.,:/\-]', '', regex=True)

    # Handle numeric formatting issues (e.g., "1,000.50")
    for col in df.select_dtypes(include='object').columns:
        # Try converting strings with commas to float
        try:
            df[col] = df[col].str.replace(',', '')
            df[col] = pd.to_numeric(df[col], errors='ignore')
        except:
            continue

    return df
