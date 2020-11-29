const url = 'http://localhost:4000/greeting/'
let regexValidation = new RegExp(/^[A-Za-z]{3,}$/);

closepopup = () => {
  document.getElementById("formpoup").style.display = "none";
  location.reload()
};
closegrid = () => {
  document.getElementById("gridCards").style.display = "none";
};


handelModal = (style) => {
  document.querySelector(".modal").style.display = style
}
renderCards = (posts) => {
  let output = "";
  posts.forEach((post) => {
    output += `<div class="card-box">
    <div class="grid-box">
        <div class="data">
          <span>${post.name}</span>
        </div>
        <div class="data">
          <span>${post.greeting}</span>
        </div>
        <div class='div-card1'><img src="./assets/edit.png" onclick="editPopup()"></div>
        <div class='div-card2'><img src="./assets/delete.png" onclick="deletePopup('${post._id}')"></div>
    </div>
</div>`;
  });
  document.getElementById('gridCards').innerHTML = output
  
};


getGreetings = () => {
  fetch(url)
    .then(res => res.json())
    .then(result => renderCards(result.data))
    .catch((err) => {
      alert(err)
      location.reload()
    })
};




addGreetingPopup = () => {
  closegrid()
  document.getElementById("formpoup").style.display = "block";
  output =
    `<h2>Create Greeting</h2>
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

            <button type="button" class="button" onclick="addGreeting()">Save Greeting</button>
            <button type="button" class="cancel" onclick="closepopup()">Close</button>
        </form>`
  document.getElementById('formpoup').innerHTML = output
}

addGreeting = () => {
  name = document.getElementById("name").value
  greeting = document.getElementById("greeting").value

  if (!regexValidation.test(name)) {
    document.getElementById("invalid-name").style.cssText +=
      "color: #d02525";
  }
  if (!regexValidation.test(greeting)) {
    document.getElementById("invalid-message").style.cssText +=
      "color: #d02525";
  }
  if (regexValidation.test(name) && regexValidation.test(name)) {
    let params = {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        greeting: greeting
      })
    }
    fetch(url, params)
      .then(() => {
        alert("Data Added Successfully")
      })
      .catch(err => alert(err))
    closepopup()
  };
}

deleteGreeting = (id) => {
  let params = {
    method: 'DELETE'
  }
  fetch(`${url}${id}`, params)
    .then((res) => {
      console.log(res)
      closeDeletePopup()
      getGreetings()
      alert("Greeting deleted Successfully")
      
    })
    .catch(err => alert(err))
};

deletePopup = (id) => {
handelModal("block")
  output = `
    <div class="deleteBoxConformation">
    <p>Do you want to delete this greeting? </p>
    <button type="button" class="delete-button1"onclick="deleteGreeting('${id}')">Delete</button>
    <button type="button" class="delete-button2" onclick="closeDeletePopup()">Cancle</button>
    </div>`
  document.getElementById('deleteWindow').innerHTML = output
}

closeDeletePopup = () => {
  handelModal("none")
  // document.getElementById("deleteWindow").style.display = "none";
  document.querySelector(".deleteBoxConformation").remove()

};

editPopup = () => {
  document.getElementById("formpoup").style.display = "block";
  output =
    `<h2>Edit Greeting</h2>
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

            <button type="button" class="button" onclick="addGreeting()">Update Greeting</button>
            <button type="button" class="cancel" onclick="closepopup()">Close</button>
        </form>`
  document.getElementById('formpoup').innerHTML = output
}

