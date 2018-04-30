import { API } from "./api.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


$(function() {
  $(".form").submit(function(event) {
    event.preventDefault();
    let api = new API;
    $(".doctors").text("");
    let name = $("#name").val();
    let ailment = $("#ailment").val();
    console.log(name);
    console.log(ailment);
    // console.log(this);
    // let search = $(this).("button").val();
    // console.log(search);
    // if (search === "name") {
    //   name = $("#name").val();
    // } else {
    //   name = $("#ailment").val();
    // }
    // console.log(name);
    api.doctorCall(name, ailment);

    setTimeout(function() {
      if(api.foundDoctors){
        api.doctors.forEach(function(doctor) {
          let accepting;
          if (doctor.accepting) {
            accepting = "Yes";
          } else {
            accepting = "No";
          }
          if(!doctor.address[4]) {
            doctor.address[4] = "";
          }
          $(".doctors").append(`
            <div class="doctor">
            <h3>${doctor.fname} ${doctor.lname}</h3>
            <div class="details">
            <img src="${doctor.image}" alt="photo of doctor">
            <p><strong>Accepting new patients:</strong> ${accepting}</p>
            <p><strong>Phone:</strong> ${doctor.phone}</p>
            <p><strong>Website:</strong> ${doctor.website}</p>
            <p><strong>Address:</strong></p>
            <ul>
            <li>${doctor.address[3]} ${doctor.address[4]}</li>
            <li>${doctor.address[0]}, ${doctor.address[1]} ${doctor.address[2]}</li>
            </ul>
            <p><strong>Bio:</strong> ${doctor.bio}</p>
            </div>
            </div>`);
          });
      }else {
        $(".doctors").append(`<p>Search returned no results. Try aagain</p>`);
      }

      $(".results").show();
    }, 3000);
  });

});
