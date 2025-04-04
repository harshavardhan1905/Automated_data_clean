# 🧹 Automated Data Cleaning and Preprocessing Tool

Welcome to the **Automated Data Cleaning and Preprocessing Tool**, a powerful solution built for real-world data science and analytics workflows. In any data pipeline, raw datasets often come with inconsistencies, missing values, outliers, and noise that can severely affect downstream tasks like analytics, visualization, and machine learning. This project automates the entire data preparation process with a single-click interface!

---

## 🚀 Project Objective

> To design and implement a tool that takes raw CSV datasets and performs intelligent data cleaning, normalization, and preprocessing with **minimal user input**. Our tool converts messy data into clean, machine-readable datasets ready for exploration, visualization, and modeling.

---

## 📊 Key Features

### ✅ 1. Handling Missing Data
- Automatically detects and fills missing values.
- Numerical columns: filled with mean/median.
- Categorical columns: filled with mode.

### ✅ 2. Removing Duplicate Records
- Eliminates redundant rows that appear multiple times in the dataset.

### ✅ 3. Handling Outliers
- Identifies and removes extreme values using the **IQR (Interquartile Range)** method for numeric columns.

### ✅ 4. Inconsistent Formatting Fixes
- Date formats like `22-04-2025`, `22.04.2025`, `22/04/2025`, or `22\04\2025` are **standardized** to `DD-MM-YYYY`.
- Categorical column inconsistencies (e.g., `"Germanuu"` ➝ `"Germany"`) are corrected using fuzzy string matching (`fuzz` library).

### ✅ 5. Data Consistency
- Categorical strings are cleaned and matched with frequently occurring labels to fix spelling mistakes and typos.

### ✅ 6. Feature Scaling and Normalization
- Numerical features are scaled using **MinMaxScaler** or **StandardScaler** for better performance in ML models.

### ✅ 7. Encoding Categorical Variables
- Converts categorical variables to numerical using **One-Hot Encoding** while avoiding dummy variable trap (`drop_first=True`).

---

## 🖥️ Tech Stack

- **Frontend**: React.js (CSV upload + preprocessing options)
- **Backend**: Python (Pandas, NumPy, Scikit-learn, TheFuzz)
- **Notebook**: Jupyter / Google Colab for core logic testing
- **Version Control**: Git & GitHub

---

## ⚙️ How It Works

1. Upload your CSV file via the React frontend.
2. Select which operations you want to perform:
   - Fill missing data
   - Remove duplicates
   - Fix outliers
   - Standardize dates
   - Correct spelling inconsistencies
   - Normalize features
   - Encode categoricals
3. Click "Preprocess All" to apply all steps at once.
4. Download the cleaned and ready-to-use dataset.

---

## 🧠 Example

Original:
```csv
Country, Age, Salary, Date
France, 35, 60000, 22.04.2025
Germanuu, , 70000, 22/04/2025
France, 35, 60000, 22-04-2025
