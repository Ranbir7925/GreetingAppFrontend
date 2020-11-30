const url = 'http://localhost:4000/greeting/'
let regexValidation = new RegExp(/^[A-Za-z]{3,}$/);

handelModal = (style) => {
  document.querySelector(".modal").style.display = style
}

renderCards = (posts) => {
  let output = "";
  posts.forEach((post) => {
    let date =
      post.createdAt.split("T")[0];
    output += `<div class="card-box">
    <div class="grid-box">
        <div class="data">
          <span>${post.name}</span>
        </div>
        <div class="data">
          <span>${post.greeting}</span>
        </div>
        <div class="data">
          <span>${date}</span>
        </div>
        <div class='div-card1'><img src="./assets/edit.png" onclick="editPopup('${post._id},'${post.name}','${post.greeting}')"></div>
        <div class='div-card2'><img src="./assets/delete.png" onclick="deletePopup('${post._id}')"></div>
    </div>
</div>`;
  });
  document.querySelector('.greeting-cards').innerHTML = output
};


getGreetings = () => {
  fetch(url)
    .then(res => res.json())
    .then(result => renderCards(result.data))
    .catch(() => alert("Somthing went wrong..!!"))
};

addGreetingPopup = () => {
  handelModal("block")
  output = `<div class="popup">
    <h2>Create Greeting</h2>
        <form>
            <div class="box">
                <input type="text" autocomplete="off" required id="name">
                <label>Name</label>
            </div>
            <div class="error-box" id="invalid-name">
                * Invalid atlest 3 characters
            </div>
            <div class="box">
                <input type="text" autocomplete="off" required id="greeting">
                <label>Greeting</label>
            </div>
            <div class="error-box" id="invalid-message">
                * Invalid atlest 3 characters
            </div>

            <button type="button" class="button" onclick="addGreeting()">Save</button>
            <button type="button" class="cancel" onclick="closePopup()">Close</button>
        </form>
        </div>`
  document.querySelector(".modal-content").innerHTML = output
}

addGreeting = () => {
  name = document.querySelector("#name").value
  greeting = document.querySelector("#greeting").value

  if (!regexValidation.test(name)) {
    document.querySelector("#invalid-name").style.cssText +=
      "color: #d02525";
  }
  if (!regexValidation.test(greeting)) {
    document.querySelector("#invalid-message").style.cssText +=
      "color: #d02525";
  }
  if (regexValidation.test(name) && regexValidation.test(name)) {
    let parameters = {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        greeting: greeting
      })
    }
    fetch(url, parameters)
      .then(() => {
        closePopup()
        alert("Greeting Added Successfully")
        getGreetings()
      })
      .catch(() => alert("Error occcured while adding greeting try again..!!"))
    closePopup()
  }
};

closePopup = () => {
  handelModal("none")
  if (document.querySelector(".popup"))
    document.querySelector(".popup").remove()
};


editPopup = (id, name, greeting) => {
  handelModal("block")
  output = `<div class="popup">
    <h2>Edit Greeting</h2>
        <form>
            <div class="box">
                <input type="text" value="${name}" autocomplete="off" required id="name">
                <label>Name</label>
            </div>
            <div class="error-box" id="invalid-name">
                * Invalid atlest 3 characters
            </div>
            <div class="box">
                <input type="text" value="${greeting}" autocomplete="off" required id="greeting">
                <label>Greeting</label>
            </div>
            <div class="error-box" id="invalid-message">
                * Invalid atlest 3 characters
            </div>

            <button type="button" class="button" onclick="editGreeting('${id}')">Save</button>
            <button type="button" class="cancel" onclick="closePopup()">Close</button>
        </form>
        </div>`
  document.querySelector(".modal-content").innerHTML = output
}

editGreeting = (id) => {
  if (id == 'undefined') {
    alert('Id cant be undefined')
    closePopup()
    getGreetings()
  }
  else {
    name = document.querySelector("#name").value
    greeting = document.querySelector("#greeting").value

    if (!regexValidation.test(name)) {
      document.querySelector("#invalid-name").style.cssText +=
        "color: #d02525";
    }
    if (!regexValidation.test(greeting)) {
      document.querySelector("#invalid-message").style.cssText +=
        "color: #d02525";
    }
    if (regexValidation.test(name) && regexValidation.test(name)) {
      let parameters = {
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          greeting: greeting
        })
      }
      fetch(`${url}${id}`, parameters)
        .then(() => {
          alert("Greeting updated Successfully")
          closePopup()
          getGreetings()
        })
        .catch(() => alert("Error occcured while updating greeting try again..!!"))
      closePopup()
    }
  }
};

deleteGreeting = (id) => {
  if (id == 'undefined') {
    alert('Id cant be undefined')
    closeDeletePopup()
    getGreetings()
  }
  else {
    let parameters = {
      method: 'DELETE'
    }
    fetch(`${url}${id}`, parameters)
      .then(() => {
        alert("Greeting deleted Successfully")
        closeDeletePopup()
        getGreetings()
      })
      .catch(() => alert("Error occcured while updating greeting try again..!!"))
  }
};

deletePopup = (id) => {
  handelModal("block")
  output = `
    <div class="deleteBoxConformation">
    <p>Do you want to delete this greeting? </p>
    <button type="button" class="delete-button1"onclick="deleteGreeting('${id}')">Delete</button>
    <button type="button" class="delete-button2" onclick="closeDeletePopup()">Cancle</button>
    </div>`
  document.querySelector('.modal-content').innerHTML = output
}

closeDeletePopup = () => {
  handelModal("none")
  document.querySelector(".deleteBoxConformation").remove()
};