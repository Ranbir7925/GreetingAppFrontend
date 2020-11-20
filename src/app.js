const localhost = `http://localhost:4000/greeting`;
createGreetingForm = () => {
  document.getElementById("createGreeting").style.display = "block";
  document.getElementById("postsCards").style.display = "none";
};
closeForm = () => {
  document.getElementById("createGreeting").style.display = "none";
};

const printCards = (posts) => {
  let output = "";
  posts.forEach((post) => {
    output += `<div class="card" >
  <div class="box1" name="G1"><a class="greetingBox" onclick="selectWork('${post._id}')">Id:- ${post._id} <br> Name:- ${post.name} <br> 
  Greeting:- ${post.greeting} <br> Created on:- ${post.createdAt}</a> <br>
  </div>
  </div>`;
  });
  postsCards.innerHTML = output;
};

getGreeting = () => {
  fetch(localhost)
    .then((response) => response.json())
    .then(result => printCards(result.data))
    .catch(err => {
      return err
    })
}