let para = document.querySelector('p')
let btn = document.getElementById('btn')
// let fheadin = document.getElementById('#fheading')
// console.log(para, btn, fheadin)
const changeP=(e)=>{
    console.log(e)
    para.innerText+=" Jai Shree Ram"
}

btn.addEventListener('click', changeP);
