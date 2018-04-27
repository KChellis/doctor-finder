import { Doctor } from "./doctor.js";

class API {
  constructor() {
    this.key = process.env.exports.apiKey;
    this.foundDoctors;
    this.results;
    this.doctors = [];
  }

  handleResults() {
    for (var i = 0; i < this.results.data.length; i++) {
      let profile = this.results.data[i].profile;
      let fname = profile.first_name;
      let lname = profile.last_name;
      let image = profile.image_url;
      let bio = profile.bio;
      let address = [];
      address.push(this.results.data[i].practices[0].visit_address.city);
      address.push(this.results.data[i].practices[0].visit_address.state);
      address.push(this.results.data[i].practices[0].visit_address.zip);
      address.push(this.results.data[i].practices[0].visit_address.street);
      address.push(this.results.data[i].practices[0].visit_address.street2);
      let phone;
      for (var j = 0; j < this.results.data[j].practices[0].phones.length; j++) {
        if(this.results.data[j].practices[0].phones[j].type === "landline"){
          phone = this.results.data[j].practices[0].phones[j].number;
        }
      }
      let accepting = this.results.data[i].practices.accepts_new_patients;
      let website;
      if(this.results.data[i].practices.website) {
        website = this.results.data[i].practices.website;
      }else {
        website = "No website found";
      }
      let doctor = new Doctor(fname, lname, address, phone, image, bio, website, accepting);
      this.doctors.push(doctor);
    }
  }

  doctorCall(name) {
    let promise = new Promise ((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=45.5435634%2C-122.7945077%2C20&skip=0&limit=50&user_key=${this.key}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        }else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
    promise.then((response) => {
      this.results = JSON.parse(response);
      if (this.results.data.length !== 0) {
        this.handleResults();
        this.foundDoctors = true;
      }else {
        this.foundDoctors = false;
      }
    });
  }



}

export { API };
