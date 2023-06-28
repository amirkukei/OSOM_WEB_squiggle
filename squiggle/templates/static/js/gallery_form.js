const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;

/*
    {% for drawing in drawings %}
    <div className="drawing">
        <img src="{{ drawing.drawing_data.url }}" alt="Drawing">
            <p>Created at: {{drawing.created_at}}</p>
            <button className="delete-button" onClick="deleteDrawing({{ drawing.id }})">Delete</button>
            <input className="rename-input" id="rename-input-{{ drawing.id }}" type="text" value="{{ drawing.name }}"
                   readOnly>
                <button className="rename-button" onClick="renameDrawing({{ drawing.id }})">Rename</button>
    </div>
    {% empty %}
    <p>No drawings available.</p>
    {% endfor %}

*/

function renderDrawings(drawings) {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  if (drawings.length === 0) {
    const noDrawingsMessage = document.createElement('p');
    noDrawingsMessage.textContent = 'No drawings available.';
    container.appendChild(noDrawingsMessage);
    return;
  }

  for (let drawing of drawings) {
    const drawingDiv = document.createElement('div');
    drawingDiv.classList.add('drawing');

    const image = document.createElement('img');
    image.src = drawing.drawing_data.url;
    image.alt = 'Drawing';
    drawingDiv.appendChild(image);

    const createdAt = document.createElement('p');
    createdAt.textContent = `Created at: ${drawing.created_at}`;
    drawingDiv.appendChild(createdAt);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteDrawing(drawing.id));
    drawingDiv.appendChild(deleteButton);

    const renameInput = document.createElement('input');
    renameInput.classList.add('rename-input');
    renameInput.id = `rename-input-${drawing.id}`;
    renameInput.type = 'text';
    renameInput.value = drawing.name;
    renameInput.readOnly = true;
    drawingDiv.appendChild(renameInput);

    const renameButton = document.createElement('button');
    renameButton.classList.add('rename-button');
    renameButton.textContent = 'Rename';
    renameButton.addEventListener('click', () => renameDrawing(drawing.id));
    drawingDiv.appendChild(renameButton);

    container.appendChild(drawingDiv);
  }
}

function fetchDrawings() {
  fetch('/drawings/')  // Replace with the actual URL to fetch the drawings data
    .then(response => response.json())
    .then(data => renderDrawings(data))
    .catch(error => console.error(error));
}

// Call fetchDrawings() to initiate the fetch and render the drawings
fetchDrawings()
