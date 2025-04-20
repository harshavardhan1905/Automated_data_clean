import pandas as pd

def handle_duplicates(df):
    """
    Automatically remove exact duplicate rows from the DataFrame.

    Parameters:
    - df (pd.DataFrame): Input DataFrame

    Returns:
    - pd.DataFrame: Cleaned DataFrame with duplicates removed
    """
    before = len(df)
    df_cleaned = df.drop_duplicates()
    after = len(df_cleaned)
    print(f"Removed {before - after} duplicate rows.")
    return df_cleaned
