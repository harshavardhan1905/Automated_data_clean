import pandas as pd
import sys
import json

def analyze_file(file_path):
    df = pd.read_csv(file_path)

    result = {
        "name": str(file_path.split("/")[-1]),
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "duplicates": int(df.duplicated().sum()),
        "nulls": int(df.isnull().sum().sum()),
        "preview": df.head(30).astype(str).to_dict(orient="records")  # convert to strings to avoid dtype issues
    }

    return result

if __name__ == "__main__":
    file_path = sys.argv[1]
    try:
        result = analyze_file(file_path)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

