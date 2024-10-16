//Function to check the form data entered is correct or not
var validateForm = () => {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;
  if (name == "") {
    alert("Name is required");
    return false;
  }
  if (age == "") {
    alert("Age is required");
    return false;
  } else if (age < 1) {
    alert("Age Must not be Zero or Less Than 1");
    return false;
  }
  if (address == "") {
    alert("Address is required");
    return false;
  }
  if (email == "") {
    alert("Email is required");
    return false;
  }
  if (!email.includes("@")) {
    alert("Invalid Email");
    return false;
  }
  return true;
};

//Function to show the Data present in the localStorage
function showData() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else peopleList = JSON.parse(localStorage.getItem("peopleList"));

  var html = "";

  peopleList.forEach((ele, index) => {
    html += "<tr>";
    html += "<td>" + ele.name + "</td>";
    html += "<td>" + ele.age + "</td>";
    html += "<td>" + ele.address + "</td>";
    html += "<td>" + ele.email + "</td>";
    html +=
      '<td><button onclick = "deleteData(' +
      index +
      ')" class = "btn btn-danger" > Delete </button> <button onclick = "updateData(' +
      index +
      ')" class = "btn btn-warning" >Edit</button></td>';
      html += "</tr>";
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads all the data when we reload the page
document.onload = showData()


//Function to add the data in the Local Storage

function AddData(){
    if(validateForm() != true)return ;
    else{
        var name = document.getElementById('name').value
        var age = document.getElementById('age').value
        var address = document.getElementById('address').value
        var email = document.getElementById('email').value
    }
    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } 
    else peopleList = JSON.parse(localStorage.getItem("peopleList"));

    peopleList.push({
        name : name,
        age : age,
        address : address,
        email : email
    });
    localStorage.setItem("peopleList",JSON.stringify(peopleList))
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
}

//Function to delete the data from the Local Storage

function deleteData(index){
    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } 
    else peopleList = JSON.parse(localStorage.getItem("peopleList"));

    peopleList.splice(index,1);
    localStorage.setItem("peopleList",JSON.stringify(peopleList))
    showData();
}

//Function to update the Data in the Local Storage

function updateData(index){
    document.getElementById('Submit').style.display = "none"
    document.getElementById('Update').style.display = "block"

    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } 
    else peopleList = JSON.parse(localStorage.getItem("peopleList"));

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector('#Update').onclick = ()=>{
        if(validateForm() == true){
            peopleList[index].name = document.getElementById('name').value;
            peopleList[index].age = document.getElementById('age').value;
            peopleList[index].address = document.getElementById('address').value;
            peopleList[index].email = document.getElementById('email').value;

            localStorage.setItem("peopleList",JSON.stringify(peopleList))

            showData();

            document.getElementById('name').value = "";
            document.getElementById('age').value = "";
            document.getElementById('address').value = "";
            document.getElementById('email').value = "";

            document.getElementById('Submit').style.display = "block"
            document.getElementById('Update').style.display = "none"
        }
    }
}