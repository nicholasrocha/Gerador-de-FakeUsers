async function generateFakerUsers() {
  var qt = document.querySelector("#quantUsers").value;
  var nat = document.querySelector("#natUsers").value;
  var inputsGender = document.getElementsByTagName("input");
  var gender = "";
  
  for (let input of inputsGender) {
      if (input.checked == true && input.type === "radio") {
          gender = input.value;
      }
  }

  // Verifica se a quantidade é válida
  if (qt < 1 || qt > 100) {
      alert("Insira um número entre 1 e 100.");
      return;
  }

  var reply = await fetch(
      `https://randomuser.me/api/?results=${qt}&gender=${gender}&nat=${nat}`
  );
  var data = await reply.json();
  document.querySelector(".allUsers").innerHTML = "";

  for (let user of data.results) {
      let userDiv = document.createElement("div");
      userDiv.classList.add("user");

      userDiv.innerHTML = `
      <img width="100" src=${user.picture.medium} />
      <div class="info">
        <span><b>Nome:</b> ${user.name.first} ${user.name.last}</span>
        <span><b>Email:</b> ${user.email}</span>
        <span><b>Data de Nascimento:</b> ${new Date(user.dob.date).toLocaleDateString()}</span>
        <span><b>Telefone:</b> ${user.phone}</span>
        <span><b>Localização:</b> ${user.location.city}, ${user.location.state}, ${user.location.country}</span>
      </div>`;

      document.querySelector(".allUsers").appendChild(userDiv);
  }
}
