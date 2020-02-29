
const client_id = "4de6e38e74dbbdd1c4cd"

const client_secret = "4fd44ea425ed70c0e0f4643c18d08da705643315"

class Github {

    constructor (clientId, clientSecret) {    
       this.client_id= clientId;
       this.client_secret = clientSecret;
      }
    
    async fetchUser(user) {
        const userDataRequest = await fetch(`http://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const userData = await userDataRequest.json();
        return userData;
      }
    
    }


class render {
    constructor() {
        this.profile = document.getElementById('indexhtml');
      }
    
      showProfile(user) {
        this.profile.innerHTML = `
        <div class="card mt-2 animated bounceInLeft">
        <img src="${user.avatar_url}" class="card-img-top"/>        
        <div class="card-body">
          <h3 class="card-title">${user.name} / ${user.login}</h3>
          <a href="${user.html_url}" class="btn btn-primary btn-block">
            View Profile
          </a>
          <h5 class="badge badge-success">
            followers: ${user.followers}
          </span>
          <h5 class="badge badge-primary">
            following: ${user.following}
          </span>
         
        </div>
      </div>
        `;
        //this.clearMessage();
      }
    }

  


    const github = new Github(client_id, client_secret);

    const renderone = new render();
    //console.log(github.fetchUser('fazttech'));

     // DOM Elements
    const Form = document.getElementById('userForm');

    Form.addEventListener('submit', (e) => {

      const textSearch = document.getElementById('textSearch').value;
  if (textSearch !== '') {
    github.fetchUser(textSearch)
      .then(data => {
        if (data.message === 'Not Found') {
          console.log('user not exist')
        } else {
          renderone.showProfile(data);
        }
      })
    }
    e.preventDefault();
  });
