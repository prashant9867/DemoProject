import re

# Function to modify a single query
def modify_query(query):
    # Remove the column name and its value
    # This regex targets the column name and its corresponding value inside the VALUES part
    query = re.sub(r"resolutionclosurecontrolsid\s*,\s*", "", query)
    query = re.sub(r"'[^']+'\s*,\s*", "", query, count=1)
    
    # Fix syntax issues
    query = re.sub(r"\(\s*,", "(", query)  # Remove leading comma in VALUES list
    query = re.sub(r",\s*\)", ")", query)  # Remove trailing comma in VALUES list

    return query

# Read the input file
with open('inputfile.txt', 'r') as file:
    queries = file.readlines()

# Modify each query
modified_queries = [modify_query(query) for query in queries]

# Write the modified queries to a new file
with open('outputfile.txt', 'w') as file:
   file.writelines(modified_queries)

print("Queries have been modified and saved to 'modified_queries.sql'")
