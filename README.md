# 📸 Web-Based Photo Upload to AWS S3

This project provides a secure, easy-to-use web interface for uploading images directly from a browser to an Amazon S3 bucket—no need for AWS CLI or console knowledge. Built using HTML, CSS, JavaScript, and AWS SDK for JavaScript, it also features voice feedback using the Web Speech API for accessibility.

---

## 🚀 Features

* Upload .JPG, .JPEG, or .PNG images
* Direct upload to AWS S3 from browser
* Real-time upload progress indicator
* Voice assistant for user feedback (via Web Speech API)
* Stylish and responsive UI
* File preview with filename

---

## 📂 Project Structure

```
.
├── index.html         # Main web page
├── styles.css         # Styling for the upload interface
├── app.js             # AWS upload logic and speech integration
└── README.md
```

---

## 🔐 AWS Setup

1. Sign in to AWS Console.
2. Go to IAM → Create a new user with programmatic access.
3. Attach policy: AmazonS3FullAccess (for testing only—use restricted policy in production).
4. Save Access Key ID and Secret Access Key.
5. Create a new S3 bucket (e.g., student-photos-1) and enable public read access (or configure as per your access policy).
6. Replace placeholders in app.js:

```js
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_KEY',
  region: 'YOUR_BUCKET_REGION'
});
```

---

## 💡 How to Use

1. Open index.html in a browser.
2. Click “Choose Photo” to select an image.
3. Click “Upload”.
4. Listen to the voice assistant and track progress.
5. View uploaded image preview on successful upload.

---

## 🎨 Preview

(Insert a screenshot or GIF of your app in action here)

---

## ⚠️ Security Warning

This project uses client-side credentials for demonstration only. Do not expose AWS credentials in production. Instead, use AWS Cognito or a backend proxy for secure authentication.

---

## 📦 Dependencies

* AWS SDK for JavaScript v2
* Web Speech API (built-in in modern browsers)

---

## 🧠 Future Improvements

* Secure uploads using AWS Cognito or API Gateway
* Add image validation (size, type)
* Thumbnail preview
* Drag-and-drop UI

---

## 📜 License

This project is licensed under the MIT License.

---

Let me know if you want me to generate this as a downloadable README.md or add a GitHub Actions deployment suggestion.
