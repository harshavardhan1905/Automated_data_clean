import pandas as pd
from scipy import stats

def detect_outliers(df):
    # Detect outliers using IQR (Interquartile Range) method for numerical data
    outliers = {}
    
    # For each numerical column, calculate IQR and identify outliers
    for col in df.select_dtypes(include=['number']).columns:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        # Identify outliers
        outliers[col] = df[(df[col] < lower_bound) | (df[col] > upper_bound)]
    
    return outliers

def handle_outliers(df, method="drop"):
    # Automatically detect outliers
    detected_outliers = detect_outliers(df)
    
    # Handle outliers based on user-selected method
    for col, outlier_rows in detected_outliers.items():
        if method == 'drop':
            # Drop rows with outliers
            df = df[~df.index.isin(outlier_rows.index)]
        
        elif method == 'cap':
            # Cap values to 1st and 99th percentiles
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            lower_bound = Q1 - 1.5 * (Q3 - Q1)
            upper_bound = Q3 + 1.5 * (Q3 - Q1)
            df[col] = df[col].clip(lower=lower_bound, upper=upper_bound)
        
        elif method == 'median_mode':
            # Replace with median for numerical columns
            median = df[col].median()
            df[col] = df[col].apply(lambda x: median if x in outlier_rows[col].values else x)
        
        elif method == 'mean_mode':
            # Replace with mean for numerical columns
            mean = df[col].mean()
            df[col] = df[col].apply(lambda x: mean if x in outlier_rows[col].values else x)

    return df
