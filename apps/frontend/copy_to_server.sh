#!/bin/bash

PUBLIC_FOLDER_PATH="../backend/src/public/instructor"

clean_up_build_folder() {
    if [ -d instructor/ ]; then 
        rm -rf instructor/ 
    fi
}

clean_up_build_folder

if  ! npm run build;
then
    echo "Failed to build" && exit 1
fi

mv build/ instructor/ 

echo "Finished building bundle"

# remove old bundle on backend
if [ -d "${PUBLIC_FOLDER_PATH}" ]; then
    echo "Removing instructor app folder in backend public folder..."
    rm -r "${PUBLIC_FOLDER_PATH}" || (echo "Failed to remove" && exit 1)
fi

# create instructor folder in public folder
mkdir "${PUBLIC_FOLDER_PATH}"

echo "Copying new bundle to backend public folder..."
cp -r instructor/ "${PUBLIC_FOLDER_PATH}" || (echo "Failed to copy new bundle" && exit 1)

echo "Finished deploying new bundle"

clean_up_build_folder