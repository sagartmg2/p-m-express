function signupUser() {

    console.log("singup");
    // console.log("request from user");
    // console.log("check if valid or not");
    // console.log("hah password");
    // console.log("database store ");
    // console.log("database store ");

}


const login = () => {
    console.log("login");
    // console.log("request");
    // console.log("passowrd , email check");
    // console.log("check with database ");
}

const reset = () => {
    console.log("rest");
}

// module.exports = signupUser  // default export
// module.exports = login  // default export 

module.exports = reset // default 
module.exports.signupUser = signupUser  // named export 
module.exports.login = login // named export


module.exports = {
    signupUser: signupUser,
    login: login
}

