class API {
  constructor() {
    this.key = process.env.exports.apiKey;
    this.doctors = [];
  }
  makeCall(name) {
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
     if (difficulty === "hard") {
       this.resultsHard = JSON.parse(response);
     }else if (difficulty === "medium") {
       this.resultsMedium = JSON.parse(response);
     }else if (difficulty === "easy") {
       this.resultsEasy = JSON.parse(response);
     }
   });
  }

}
