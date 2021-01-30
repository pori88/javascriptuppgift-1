const form = document.getElementById('form');
const förnamn = document.getElementById('förnamn');
const efternamn = document.getElementById('efternamn');
const email = document.getElementById('email');
const id = document.getElementById('ID');
const output = document.getElementById ('output');
let users = [];





 const renderUsers = () => {
    output.innerHTML ='';
    users.forEach(user => {
        let html = `
        <div class="container d-flex justify-content-between align-items-center py-2 rounded bg-white" id="output">
            <div>
                <h3 class="mt-4 py-1">${user.förnamn} ${user.efternamn}</h3>
                <small>${user.email}</small>
                <button class="btn btn-primary border px-2 p-1">Ändra</button> 
                <button class="btn btn-danger px-2 border p-1 px-4">X</button>
            </div>
        </div>`
    output.innerHTML += html
    })
}




 /* listUser(); */

    



form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkInputs()) {
        createUser(förnamn.value, efternamn.value, email.value);
        renderUsers();
        
}


    // checkInputs();
});

let förnamnValue = null
let efternamnValue = null
let emailValue = null

function checkInputs() {
    //trim ska stoppa tomrum
    förnamnValue = förnamn.value.trim();
    efternamnValue = efternamn.value.trim();
    emailValue = email.value.trim();
    let errors = []
   

    if(förnamnValue === '') {
        setErrorFor(förnamn, 'Förnamnet kan inte vara tomt');
        errors.push('förnamn');

    } else  {
        setSucessFor(förnamn, '');
        errors.splice(errors.indexOf('förnamn'), 1);

    }

    if(efternamnValue === '') {
        setErrorFor(efternamn, 'Efternamnet kan inte vara tomt');
        errors.push('efternamn');


    } else {
        setSucessFor(efternamn, '');
        errors.splice(errors.indexOf('efternamn'), 1);

    }

    if(emailValue === '') {
        setErrorFor(email, 'Emailet kan inte vara tomt');
        if(!errors.includes('email'))
            errors.push('email');


    } else if(!isEmail(emailValue)) {
        setErrorFor(email, 'Emailet är inte giltigt');
        if(!errors.includes('email'))
            errors.push('email');

    } else {
        setSucessFor(email, 'Du är nu registeread');
        setIdTextFor(ID,'Din unika ID');
        myFunction (document.getElementById("ID").value =Date.now());
        errors.splice(errors.indexOf('email'), 1);
        
    }

    if(errors.length > 0) {
        return false
    } else {
        return true
    }
}   



    const validate = () => {

    document.querySelectorAll('input').forEach(input => {
    
      if(input.type === "text") {
        validateText(input.id);
         console.log(validateText)
      }
    
      if(input.type === "email") {
        validateEmail(input.id);
      }
    })
  }

    const createUser = (förnamn,efternamn,email) => {
    let user = {
        id: Date.now().toString(),
        förnamn,
        efternamn,
        email
    }

    users.push(user);
   /*  console.log (users); */
}
        renderUsers();
        




function myFunction() {
  
}

function setErrorFor(input, message) {
    const formControll = input.parentElement;
    const small = formControll.querySelector('small');


    small.innerText = message;

    formControll.className = 'form-controll error';
}


function setSucessFor(input, message) {
    const formControll = input.parentElement;
    const small =formControll.querySelector('small')
    small.innerText = message;
    formControll.className = 'form-controll success';


}

function setIdTextFor(input,message,) {
    const formControll = input.parentElement;
    const small =formControll.querySelector('small')
    small.innerText =message;
    formControll.className ='form-controll success'
}



function isEmail(email) {
    return /^\b[A-ZÅÄÖåäö0-9._%+-]+@[A-ZÅÄÖåäö0-9.-]+\.[A-Z]{2,4}\b$/i,(email);

}