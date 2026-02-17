const GITHUB_APi = 'https://api.github.com/users/aksaymarch7';

const user = fetch(GITHUB_APi);
console.log(user) // pending 

user.then(console.log(user)) // pending 

// user.then(function(data){
//     console.log(data)
// })
