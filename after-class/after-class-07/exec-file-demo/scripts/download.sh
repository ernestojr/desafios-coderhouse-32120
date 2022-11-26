echo "Target: $1"
echo "Folder name: $2"

echo "Cloning repo $1 in ./$2..."
git clone $1 ./$2

echo "Zipping folder $2 in file $2.zip..."
zip -r $2.zip $2

echo "Removing folder ./$2..."
rm -R ./$2

echo "Task finished!"