

window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status === 200) {
      const drawings = JSON.parse(xhr.responseText);
      for (const drawing of drawings) {

            let image = new Image();

            image.src =drawing.drawing_data;

            image.onload=function(){
                ctx.drawImage(image, 0, 0);

            }
            bodyElement.appendChild(image);

        }
    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "load_drawings");
  xhr.send();
};
