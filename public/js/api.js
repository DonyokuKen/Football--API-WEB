const base_url = "https://api.football-data.org/v2/";
const teams = "teams/";
const standings = "competitions/2021/standings/";
const headers = {
  headers: {
    'X-Auth-Token' : "83fcb5995ded4f74b3fa20c3e4df3621"
  }
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status.any) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + teams, headers).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.teams.forEach(function(teams) {
            articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${teams.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${teams.crestUrl}"/>
                      </div>
                    </a>
                    <div class="card-content">
                    <span class="card-title">${teams.name}</span>
                    <p>${teams.shortName}</P>
                    <p>${teams.email}</P>
                    <p>${teams.phone}</P>
                    <p>${teams.venue}</P>
                    <p>${teams.website}</P>
                  </div>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + teams, headers)
  
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      
      // Menyusun komponen card artikel secara dinamis
      // let urlGambar = crestUrl.replace(/^http:\/\//i, 'https://');
      
      var articlesHTML = "";
      data.teams.forEach(function(teams) {
        
        var url = `${teams.crestUrl}`
        if (url !== null) { urlGambar = url.replace(/^http:\/\//i, 'https://');}
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${teams.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${urlGambar}"/>
                  </div>
                </a>
                <div class="card-content">
                <span class="card-title">${teams.name}</span>
                <p>${teams.shortName}</P>
                <p>${teams.email}</P>
                <p>${teams.phone}</P>
                <p>${teams.venue}</P>
                <p>${teams.website}</P>
              </div>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getTeamsById() {
  return new Promise(function(resolve, _reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");;

    if ("caches" in window) {
      caches.match(base_url + teams + idParam, headers)
      .then(function(response) {
        if (response) {
          response.json().then(function(teams) {
            var articleHTML = "";
            articleHTML += `
              <div class="card">
                <a href="${teams.crestUrl}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${teams.crestUrl}"/>
                  </div>
                </a>
                <div class="card-content">
                <span class="card-title">${teams.name}</span>
                <p>${teams.shortName}</P>
                <p>${teams.email}</P>
                <p>${teams.phone}</P>
                <p>${teams.venue}</P>
                <p>${teams.website}</P>
              </div>
              </div>`;
            data.squad.forEach(function(squad) {
              articleHTML += `
                <div class="card">
                  <div class="card-content">
                  <span class="card-title">${squad.name}</span>
                  <p>${squad.position}</p>
                  <p>${squad.nationality}</p>
                </div>
                  </div>
              `});
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(teams);
          });
        }
      });
    }

    fetch(base_url + teams + idParam, headers)
      .then(status)
      .then(json)
      .then(function(teams) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let urlGambar = teams.crestUrl.replace(/^http:\/\//i, 'https://');
        var articleHTML = "";
        articleHTML += `
        <div class="card">
          <a href="${urlGambar}">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${urlGambar}"/>
            </div>
          </a>
          <div class="card-content">
                <span class="card-title">${teams.name}</span>
                <p>${teams.shortName}</P>
                <p>${teams.email}</P>
                <p>${teams.phone}</P>
                <p>${teams.venue}</P>
                <p>${teams.website}</P>
              </div>
        </div>`;
        teams.squad.forEach(function(squad) {
          articleHTML += `
                <div class="card">
                  <div class="card-content">
                  <span class="card-title">${squad.name}</span>
                  <p>${squad.position}</p>
                  <p>${squad.nationality}</p>
                </div>
                  </div>
              `});
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(teams);
      });
  });
}

function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + standings, headers).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.standings.forEach(function(stand) {
            stand.table.forEach(function(table){
            articlesHTML += `
                    <div class="table">
                        <table class="highlight">
                          <tbody>
                              <tr>
                                <td>${table.position} (${stand.type})</td>
                                <td><img src="${table.team.crestUrl}" width ="50px" height="50px"/></td> <td>${table.team.name}</td>
                                <td>${table.won}</td>
                              </tr>
                          </tbody>
                        </table>
                        </a>
                      </div>
                    </div>
                `;
              })
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + standings, headers)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      
    
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.standings.forEach(function(stand) {
        stand.table.forEach(function(table){
        articlesHTML += `
                <div class="table">
                    <table class="highlight">
                      <tbody>
                          <tr>
                            <td>${table.position} (${stand.type})</td>
                            <td><img src="${table.team.crestUrl}" width ="50px" height="50px"/></td> <td>${table.team.name}</td>
                            <td>${table.won}</td>
                          </tr>
                      </tbody>
                    </table>
                    </a>
                  </div>
                </div>
            `;
          })
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = articlesHTML;
      console.log(stand);
    })
    .catch(error);
}

function getSavedArticles() {
  getAll().then(function(articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function(teams) {
      articlesHTML += `
                  <div class="card">
                <a href="./article.html?id=${teams.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${teams.crestUrl}"/>
                  </div>
                </a>
                <div class="card-content">
                <div class="card-content">
                <span class="card-title">${teams.name}</span>
                <p>${teams.shortName}</P>
                <p>${teams.email}</P>
                <p>${teams.phone}</P>
                <p>${teams.venue}</P>
                <p>${teams.website}</P>
              </div>
                </div>
              </div>`
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("saved").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  getById(idParam).then(function(data) {
    articleHTML = '';
    var articleHTML = "";
            articleHTML += `
              <div class="card">
                <a href="${data.crestUrl}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${data.crestUrl}"/>
                  </div>
                </a>
              </div>`;
            data.squad.forEach(function(squad) {
              articleHTML += `
                <div class="card">
                  <div class="card-content">
                  <span class="card-title">${squad.name}</span>
                  <p>${squad.position}</p>
                  <p>${squad.nationality}</p>
                </div>
                  </div>
              `});
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}