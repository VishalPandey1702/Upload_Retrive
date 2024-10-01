const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

// AWS S3 configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to retrieve all uploaded files from S3 bucket
const getUploads = async (req, res) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // The name of your S3 bucket
    };

    // Create the S3 command to list objects in the bucket
    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    // Check if there are any contents (files) in the bucket
    if (!data.Contents) {
      return res.status(404).json({ message: 'No files found in the bucket' });
    }

    // Construct the file URLs from the list of object keys
    const files = data.Contents.map((file) => ({
      key: file.Key,
      lastModified: file.LastModified,
      size: file.Size,
      url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
    }));

    // Return the list of files as JSON response
    res.json(files);
  } catch (error) {
    console.error('Error while retrieving uploads from S3:', error);
    res.status(500).json({ message: 'Failed to retrieve uploads from S3', error });
  }
};

module.exports = { getUploads };