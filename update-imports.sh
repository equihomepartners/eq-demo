#!/bin/bash

# Find all TypeScript and TSX files in the demo directory
find ./src/demo -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  # Replace @/components/ui with relative paths
  sed -i '' 's|@/components/ui|../ui|g' "$file"
  sed -i '' 's|from "../ui|from "./ui|g' "$file"
  sed -i '' 's|from "\.\.\/\.\.\/ui|from "../components/ui|g' "$file"
  sed -i '' 's|from "\.\.\/\.\.\/\.\.\/ui|from "../../components/ui|g' "$file"
  sed -i '' 's|from "\.\.\/\.\.\/\.\.\/\.\.\/ui|from "../../../components/ui|g' "$file"
  
  echo "Updated imports in $file"
done

echo "Import paths updated successfully!"
