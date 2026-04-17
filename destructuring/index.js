// Array Destructuring 

let arr = ['green','red','blue','orange','black']


// before ES6 we uses indexing to get array element 
let [first,second,third]=arr;
console.log(last)



// Object Destructuring 
// ================== OBJECT ==================
const user = {
  name: "Rahul",
  age: 21,
  city: "Ranchi",
  address: {
    state: "Jharkhand",
    pincode: 834001
  }
};

// ================== BASIC DESTRUCTURING ==================
const { name, age } = user;
console.log("Basic:", name, age);

// ================== RENAME VARIABLE ==================
const { name: userName } = user;
console.log("Renamed:", userName);

// ================== DEFAULT VALUE ==================
const { country = "India" } = user;
console.log("Default:", country);

// ================== NESTED DESTRUCTURING ==================
const {
  address: { state, pincode }
} = user;
console.log("Nested:", state, pincode);

// ================== REST OPERATOR ==================
const { name: n, ...rest } = user;
console.log("Rest name:", n);
console.log("Rest object:", rest);

// ================== FUNCTION PARAMETER DESTRUCTURING ==================
function printUser({ name, age, city }) {
  console.log("Function:", name, age, city);
}
printUser(user);

// ================== API RESPONSE EXAMPLE ==================
const response = {
  status: 200,
  data: {
    user: "Rahul",
    token: "abc123"
  }
};

const {
  data: { user: apiUser, token }
} = response;

console.log("API:", apiUser, token);

// ================== SAFE NESTED ACCESS ==================
const { address } = user;
const safeCity = address?.city || "Not Available";
console.log("Safe Access:", safeCity);

// ================== ORDER DOES NOT MATTER ==================
const { age: a, name: nm } = user;
console.log("Order:", a, nm);

// ================== COMMON MISTAKE ==================
const { Name } = user; // undefined (case-sensitive)
console.log("Wrong key:", Name);

// ================== FINAL OUTPUT ==================
console.log("All done 🚀");