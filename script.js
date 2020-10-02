let loader = document.getElementById("loader");

window.addEventListener("load", function() {
  setTimeout(function() {
    getData();
  }, 500);

  async function getData() {
    try {
      let response = await fetch('https://v-dresevic.github.io/Advanced-JavaScript-Programming/data/students.txt');
      if(response.status !== 200) {
        throw new Error("Error while reading file");
      }
      let text = await response.text();
      creatingStudents(text);
    } catch (err) {
      $("#errorMessage").show();
      $("#mainDiv").hide();
      errorMessage.innerHTML = "<p class='err'>Fetch failed: <b>" + err.message + "</b></p>"
    } finally {
      loader.style.display = "none";
    }
  }
});

function creatingStudents(text) {
  let lines = text.split(/\n/);
  let arrays = chunkArray(lines, 4);

  $.each(arrays, function(index, value) {
    let Students = new Student(value[0], value[1], value[2], value[3]);
    $("#text").append("<div>" + Students.getInfo() + "<div><br>");
  });
}


function Student(Name, Address, Phone, Course) {
  this.Name = Name;
  this.Address = Address;
  this.Phone = Phone;
  this.Course = Course;

  this.getInfo = function() {
    return "Name: " + this.Name + "<br> Address: " + this.Address + "<br>Phone: " + this.Phone + "<br> Course: " + this.Course;
  }
}


function chunkArray(myArray, chunk_size) {
  let index = 0
  let arrayLength = myArray.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size)    ;
    tempArray.push(myChunk);
  }

  return tempArray;
}
