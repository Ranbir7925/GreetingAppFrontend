const url = 'http://localhost:4000/greeting'
let regexValidation = new RegExp(/^[A-Za-z]{3,}$/);
create = () => {
  document.getElementById("createGreeting").style.display = "block";
  document.getElementById("gridCards").style.display = "none";
};
closepopup = () => {
  document.getElementById("createGreeting").style.display = "none";
};

renderCards = (posts) => {
  let output = "";
  posts.forEach((post) => {
    output += `<div class="card-box">
    <div class="grid-box">
        <p>Id=${post._id}</p>
        <p>Name=${post.name}</p>
        <p>Mesaage=${post.greeting}</p>
        <div class='div-card1'><img src="./assets/edit.png" onclick="edit(post._id)"></div>
        <div class='div-card2'><img src="./assets/delete.png" onclick="deleteGreeting(${post._id})"></div>
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
  if (regexValidation.test(name)&&regexValidation.test(name)) {
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
  location.reload();
};
}

deleteGreeting = (id) => {
  let params = {
    method: 'DELETE'
  }
  fetch(`url+${id}`,params)
  .then(()=>{
    alert("Greeting deleted Successfully")
    getGreetings()
  })
  .catch(err => alert(err))
};

edit = (id) =>{
  console.log("edit function",id);
}
