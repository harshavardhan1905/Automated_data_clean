import pandas as pd
import sys
import os
import json
from handle_missing_values import handle_missing_values
from handle_outliers import handle_outliers
from handle_duplicates import handle_duplicates
from fix_formatting_issues import fix_formatting_issues

def main():
    # Get the arguments from the command line
    if len(sys.argv) < 4:
        print("Usage: python preprocess.py <file_path> <missing_handle_method> <outlier_handling>")
        sys.exit(1)

    file_path = sys.argv[1]
    missing_handle_method = sys.argv[2]
    outlier_handling = sys.argv[3]

    # Check if the file exists
    if not os.path.isfile(file_path):
        print(f"Error: The file '{file_path}' does not exist.")
        sys.exit(1)

    # Load the CSV file into a DataFrame
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        print(f"Error reading the CSV file: {e}")
        sys.exit(1)

    # Step 1: Handle missing values
    try:
        df = handle_missing_values(df, strategy=missing_handle_method)
    except Exception as e:
        print(f"Error handling missing values: {e}")
        sys.exit(1)

    # Step 2: Handle outliers
    try:
        df = handle_outliers(df, method=outlier_handling)
    except Exception as e:
        print(f"Error handling outliers: {e}")
        sys.exit(1)

    # Step 3: Handle duplicates automatically (no user input)
    try:
        df = handle_duplicates(df)
    except Exception as e:
        print(f"Error handling duplicates: {e}")
        sys.exit(1)

    # Step 4: Fix formatting issues automatically (e.g., whitespace trimming, date parsing)
    try:
        df = fix_formatting_issues(df)
    except Exception as e:
        print(f"Error fixing formatting issues: {e}")
        sys.exit(1)

    # Convert the cleaned DataFrame back to JSON to send as output
    try:
        result = df.to_dict(orient="records")
        print(json.dumps(result))  # Output as a JSON string
    except Exception as e:
        print(f"Error converting DataFrame to JSON: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
