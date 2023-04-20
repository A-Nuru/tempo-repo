const form = document.querySelector("#create-form");
form.addEventListener("submit", createNewQuote);

const randomiseButton = document.querySelector("#btn-randomise");
randomiseButton.addEventListener('click', displayQuote);

function displayQuote() {

  fetch("http://localhost:3000/quotes/random")
  .then(resp => resp.json())
  .then(data=>{
    console.log(data)
    const textElement = document.querySelector("#text");
    const authorElement = document.querySelector("#author");

    textElement.textContent = data["text"];
    authorElement.textContent = data["author"];
  })

  

}

async function createNewQuote(e) {

  e.preventDefault();

  const data = {
      text: e.target.name.value,
      author: e.target.author.value 
  }

  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  }

  const response =  await fetch("http://localhost:3000/quotes", options);

  if (response.status == 201) {
    e.target.name.value = ''
    e.target.author.value = ''
    alert("Quote added.")
  }
}

