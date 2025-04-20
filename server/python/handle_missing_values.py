from sklearn.experimental import enable_iterative_imputer  # This enables IterativeImputer
from sklearn.impute import KNNImputer, IterativeImputer
import pandas as pd
import numpy as np
import random

def is_categorical(series):
    return series.dtype == 'object' or series.nunique() < 10

def random_impute(series):
    non_null_values = series.dropna()
    return series.apply(lambda x: random.choice(non_null_values) if pd.isna(x) else x)

def handle_missing_values(df, strategy='mean_mode', threshold=0.3):
    """
    Handles missing values based on the selected strategy.
    - Removes columns/rows with too many missing values.
    - Applies imputation strategy for remaining columns.
    
    strategy: 'mean_mode', 'median_mode', 'knn', 'iterative', 'random'
    """
    
    # Step 1: Drop columns with too many missing values
    missing_ratios = df.isnull().mean()
    df = df.loc[:, missing_ratios <= threshold]

    # Step 2: Impute based on selected strategy
    if strategy in ['mean_mode', 'median_mode']:
        for col in df.columns:
            if df[col].isnull().any():
                if is_categorical(df[col]):
                    df[col].fillna(df[col].mode().iloc[0], inplace=True)
                else:
                    if strategy == 'mean_mode':
                        df[col].fillna(df[col].mean(), inplace=True)
                    elif strategy == 'median_mode':
                        df[col].fillna(df[col].median(), inplace=True)

    elif strategy == 'knn':
        imputer = KNNImputer()
        df[df.columns] = imputer.fit_transform(df)

    elif strategy == 'iterative':
        imputer = IterativeImputer()
        df[df.columns] = imputer.fit_transform(df)

    elif strategy == 'random':
        for col in df.columns:
            if df[col].isnull().any():
                df[col] = random_impute(df[col])

    return df
