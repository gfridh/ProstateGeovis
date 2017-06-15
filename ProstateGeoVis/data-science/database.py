import pandas as pd
#import sqlite3 as sql

# with sql.connect(":memort:") as conn:
DATASET_BASE = "../dataset/"
person = pd.read_csv(DATASET_BASE + "person.csv", index_col="lopnr_new")
diagnoses = pd.read_csv(DATASET_BASE + "diagnoses.csv", index_col="lopnr_new")
psa = pd.read_csv(DATASET_BASE + "psa.csv", index_col="psa_sample_id_new")
biopsy = pd.read_csv(DATASET_BASE + "biopsy.csv", index_col="referral_id_new")
tables = pd.read_excel(DATASET_BASE + "Codebook.xlsx")
