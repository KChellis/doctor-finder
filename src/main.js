import { API } from "./api.js"
import { Doctor } from "./doctor.js"
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
let api= new API


$(function() {
  $(".form").submit(function(event) {
    event.preventDefault();
    let name = $("#name").val();
    let promise = api.doctorCall(name);
    promise.then(() => {
      api.doctors.forEach(function(doctor) {
        $(".results").append(`
          <div class="doctor">
            <p>${doctor.fname} ${doctor.lname}</p>
            <div class="details">
              <img src="${doctor.image}" alt="photo of doctor">
              <p>Accepting new patients: ${accepting}</p>
              <p>Phone: ${doctor.phone}</p>
              <p>Website: ${doctor.website}</p>
              <p>Address:</p>
              <ul>
                <li>${doctor.address[3]}</li>
                <li>${doctor.address[4]}</li>
                <li>${doctor.address[0]}, ${doctor.address[1]} ${doctor.address[2]}</li>
              </ul>
              <p>Bio: ${doctor.bio}</p>
            </div>
          </div>`);
      });
    });

  });
  $(".doctor").click(function() {
    $(this).children(".details").slideToggle();
  });
});
