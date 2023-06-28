window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const getForm = JSON.parse(xhr.responseText);

      let article = document.createElement("article")
      let title = document.createElement("h1");
      title.innerText = "Login";
      article.append(title)
      for (let field of getForm) {
        let userField = document.createElement("p");
        userField.className = "login";
        userField.innerText = field;
        article.append(userField);
      }

      let loginButton = document.createElement("p"); // 3
      let button = document.createElement("button");
      button.innerText = "Login";
      button.type = button;
      loginButton.append(button);
      button.onclick = function () {
            const formElement = document.querySelector('#login-form');
            const formData = new FormData(formElement);

  // Add additional data to formData or create a separate object
  const additionalData = {
    key1: 'value1',
    key2: 'value2',
    // Add more key-value pairs as needed
  };

  // Merge formData and additionalData into a single object
  const mergedData = Object.fromEntries(formData.entries());
  Object.assign(mergedData, additionalData);

    fetch('/user_login/', {
       method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mergedData),
    })
       .then(response => response.json())
  .then(data => {
    // Handle the response data
    if (data.error) {
      // Handle error case
      console.log(data.error);
    } else {
      // Handle successful login
      console.log('Login successful');
      // Redirect or perform other actions
    }
  })
  .catch(error =>{  console.error(error);});

      }
      article.append(loginButton)
                        bodyElement.appendChild(article)

    }
  }
  xhr.open("GET", "/login");
/*
    xhr.open("GET", "/movies");
*/

  xhr.send();
};