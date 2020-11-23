
create = () => {
  document.getElementById("createGreeting").style.display = "block";
};
closepopup = () => {
  document.getElementById("createGreeting").style.display = "none";
};






const printCards = (posts) => {
  let output = "";
  posts.forEach((post) => {
    output +=`<div class="card-box">
    <div class="grid-box">
        <p>Id=</p>
        <p>Name</p>
        <p>Mesaage</p>
        <p>Created on</p>
    </div>
</div>`;
  });
  getElementById("gridCards").innerHTML = output;
};

