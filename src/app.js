const url ='http://localhost:4000/greeting'
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
        <span>Id=${post._id}</span>
        <span>Name=${post.name}</span>
        <span>Mesaage=${post.greeting}</span>
    </div>
</div>`;
  });
  document.getElementById('gridCards').innerHTML = output
};


getGreetings = () =>{
  fetch(url)
    .then(res => res.json())
    .then(result => result.data)
    .then(data => renderCards(data))
    .catch((err) =>{
      return err
    })
}
