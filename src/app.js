const url ='http://localhost:4000/greeting'
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
    output +=`<div class="card-box">
    <div class="grid-box">
        <p>Id=${post._id}</p>
        <p>Name=${post.name}</p>
        <p>Mesaage=${post.greeting}</p>
        <div class='div-card1'><img src="./assets/edit.png"></div>
        <div class='div-card2'><img src="./assets/delete.png"></div>
    </div>
</div>`;
  });
  document.getElementById('gridCards').innerHTML = output
};


getGreetings = () =>{
  fetch(url)
    .then(res => res.json())
    .then(result => renderCards(result.data))
    .catch((err) =>{
      return err
    })
};

addGreeting = () =>{
  name = document.getElementById("name").value
  message = document.getElementById("message").value
  let params = {
    method: 'POST',
    headers: {"Content-type":"application/json"},
    body: JSON.stringify({
      name:name,
      greeting:message
    })
  }
  fetch(url,params)
  .then(()=>{
    alert("Data Added Successfully")
  })
  .catch((err) => err)
  closepopup()
  location.reload();
};


 test =()=>{
  console.log("test function");
}
