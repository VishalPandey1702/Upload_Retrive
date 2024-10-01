# expree-server
Here’s a concise and ready-to-use `README.md` file for your project that you can directly paste into GitHub:

---

# Image Uploader Service

A Node.js service that allows users to upload images to AWS S3 and retrieve them. The service also lists all uploaded files directly from the S3 bucket.

## Features

- Upload files to AWS S3.
- Retrieve a list of uploaded files from S3.
- File metadata is optionally stored in MongoDB.
- Uses `multer` for handling file uploads and `AWS SDK v3` for S3 operations.

## Technologies

- **Node.js**
- **Express**
- **AWS S3**
- **MongoDB** (optional for metadata)
- **AWS SDK v3**
- **Multer** (for file uploads)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/image-uploader-service.git
   cd image-uploader-service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```bash
   AWS_REGION=ap-southeast-2
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   S3_BUCKET_NAME=your-bucket-name
   MONGO_URI=mongodb://localhost:27017/image-uploader  # MongoDB URI (optional)
   PORT=3000  # Port to run the server
   ```

## Usage

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Upload a file**:
   - **URL**: `/api/uploads`
   - **Method**: `POST`
   - **Request Body**: `multipart/form-data` with a file field named `image`
   
   Example:
   ```bash
   curl -X POST -F 'image=@/path/to/image.jpg' http://localhost:3000/api/uploads
   ```

3. **Retrieve all uploaded files**:
   - **URL**: `/api/retrieve`
   - **Method**: `GET`
   
   Example:
   ```bash
   curl http://localhost:3000/api/retrieve
   ```

## AWS IAM Permissions

Ensure your IAM user has the following permissions for the S3 bucket:

```json
{
  "Effect": "Allow",
  "Action": [
    "s3:PutObject",
    "s3:GetObject",
    "s3:ListBucket"
  ],
  "Resource": [
    "arn:aws:s3:::your-bucket-name",
    "arn:aws:s3:::your-bucket-name/*"
  ]
}
```

## Project Structure

```
/image-uploader-service
├── /config        # MongoDB connection configuration
├── /controllers   # Handles file uploads and retrieval from S3
├── /models        # MongoDB schema for file metadata
├── /routes        # Express routes for uploading and retrieving files
├── /middlewares   # Multer configuration for file handling
├── /uploads       # Temporary storage for uploaded files
├── .env           # Environment variables
├── server.js      # Main server file
└── package.json   # Dependencies and scripts
```

## License

This project is licensed under the MIT License.

---

This `README.md` file is concise and provides all the necessary information to get started with your project. You can paste it directly into your GitHub repository!
