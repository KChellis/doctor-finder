import { API } from "./api.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
let api= new API;

$(function() {
  $("#Drname").submit(function(event) {
    event.preventDefault();
    $(".results").text("");
    let name = $("#name").val();
    api.doctorCall(name);
    setTimeout(function() {
      api.doctors.forEach(function(doctor) {
        if (api.foundDoctors) {
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
        } else {
          $(".doctors").append(`<p>Search returned no results. Try aagain</p>`);
        }

      });
      $(".results").show();
    }, 5000)
  });

});
