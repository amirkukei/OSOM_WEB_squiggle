
const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;


function deleteDrawing(drawingId) {
    if (confirm("Are you sure you want to delete this drawing?")) {
        fetch(`/delete_drawing/${drawingId}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken':  csrf_token
            }
        })
        .then(response => {
            if (response.ok) {
                location.reload(); // Refresh the page to update the gallery
            } else {
                console.error('Error:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function renameDrawing(drawingId) {
        const renameInput = document.querySelector(`#rename-input-${drawingId}`);

        if (renameInput.readOnly) {
            renameInput.readOnly = false;
            renameInput.focus();
        } else {
            const newName = renameInput.value.trim();

            if (newName !== '') {
                fetch(`/update_drawing/${drawingId}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token
                    },
                    body: JSON.stringify({
                        name: newName
                    })
                })
                .then(response => {
                    if (response.ok) {
                        // Display success message
                        alert('Drawing renamed successfully.');
                        // Lock the input field again
                        renameInput.readOnly = true;
                    } else {
                        console.error('Error:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        }
    }

        function updateDrawing(drawingId) {
            const renameInput = document.querySelector(`#rename-input-${drawingId}`);
            const newName = renameInput.value.trim();

            if (newName !== '') {
                fetch(`/update_drawing/${drawingId}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token
                    },
                    body: JSON.stringify({
                        name: newName
                    })
                })
                .then(response => {
                    if (response.ok) {
                        location.reload(); // Refresh the page to update the gallery
                    } else {
                        console.error('Error:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        }

