AWS.config.update({
    accessKeyId: 'Enter Your Access Key',
    secretAccessKey: 'Enter Your Secret Access Key',
    region: 'Enter Your Region'
});

const s3 = new AWS.S3();

document.getElementById('file-input').addEventListener('change', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        // Display the file name
        const fileName = document.getElementById('file-name');
        fileName.textContent = `File name: ${file.name}`;
    } else {
        document.getElementById('file-name').textContent = 'No file selected';
    }
});

document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const params = {
            Bucket: 'captured-student-images-dataset',
            Key: file.name,
            Body: file,
            ACL: 'public-read'
        };

        document.getElementById('loading-spinner').style.display = 'block';

        const options = {
            partSize: 5 * 1024 * 1024,
            queueSize: 1
        };

        s3.upload(params, options).on('httpUploadProgress', function(evt) {
            if (evt.lengthComputable) {
                const percentComplete = Math.round((evt.loaded / evt.total) * 100);
                document.getElementById('upload-percentage').textContent = percentComplete + '%';
            }
        }).send(function(err, data) {
            document.getElementById('loading-spinner').style.display = 'none';
            if (err) {
                document.getElementById('status').textContent = 'Error uploading file.';
                console.error(err);
            } else {
                document.getElementById('status').textContent = 'File uploaded successfully!';

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
        document.getElementById('status').textContent = 'Please select a file.';
    }
});
