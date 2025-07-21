// Redirect to login if not authenticated
if (!localStorage.getItem("authenticated")) {
    window.location.href = "login.html";
}


AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'ap-south-1'
});

const s3 = new AWS.S3();

// Function to speak a message using Web Speech API
function speakMessage(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}

// Handle file input change
document.getElementById('file-input').addEventListener('change', function () {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const fileName = document.getElementById('file-name');
        fileName.textContent = `File name: ${file.name}`;
        speakMessage(`File selected: ${file.name}`);
    } else {
        document.getElementById('file-name').textContent = 'No file selected';
        speakMessage('No file selected');
    }
});

// Handle upload button click
document.getElementById('upload-button').addEventListener('click', function () {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const confirmUpload = confirm(`Do you want to upload the file "${file.name}"?`);
        speakMessage(`Do you want to upload the file ${file.name}?`);
        
        if (confirmUpload) {
            speakMessage(`Uploading the file ${file.name}. Please wait.`);

            const params = {
                Bucket: 'student-photos-1',
                Key: file.name,
                Body: file,
                ACL: 'public-read'
            };

            document.getElementById('loading-spinner').style.display = 'block';

            const options = {
                partSize: 5 * 1024 * 1024,
                queueSize: 1
            };

            s3.upload(params, options).on('httpUploadProgress', function (evt) {
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded / evt.total) * 100);
                    document.getElementById('upload-percentage').textContent = percentComplete + '%';
                }
            }).send(function (err, data) {
                document.getElementById('loading-spinner').style.display = 'none';
                if (err) {
                    const errorMessage = 'Error uploading file.';
                    document.getElementById('status').textContent = errorMessage;
                    console.error(err);
                    speakMessage(errorMessage);
                } else {
                    const successMessage = 'File uploaded successfully!';
                    document.getElementById('status').textContent = successMessage;
                    speakMessage(successMessage);

                    // Create a container for the image and its name
                    const container = document.createElement('div');
                    container.className = 'image-preview-container';

                    // Create an element to display the file name
                    const uploadedFileName = document.createElement('p');
                    uploadedFileName.textContent = `File name: ${file.name}`;

                    // Create an image element
                    const img = document.createElement('img');
                    img.src = data.Location;
                    img.alt = file.name;

                    // Append the file name and image to the container
                    container.appendChild(uploadedFileName);
                    container.appendChild(img);

                    // Append the container to the preview area
                    document.getElementById('preview').appendChild(container);
                }
            });
        } else {
            const cancelMessage = 'Upload canceled.';
            document.getElementById('status').textContent = cancelMessage;
            speakMessage(cancelMessage);
        }
    } else {
        const noFileMessage = 'Please select a file.';
        document.getElementById('status').textContent = noFileMessage;
        speakMessage(noFileMessage);
    }
});