
const hideAlert=()=>{
    const el=document.querySelector('.alert');
    if(el) el.parentElement.removeChile(el);
  }
  const showalert=(type,msg)=>{
    hideAlert();
    const markup=`<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin',markup);
  window.setTimeout(hideAlert,5000);
  }
const signitup=async (name,email,password,passwordConfirm)=>{

try{
    console.log(name,email,password,passwordConfirm);
    const res=await axios({
        method:'POST',
        url:'http://127.0.0.1:3000/api/v1/users/signup',
        data:{
            name,email,password,passwordConfirm
        }
    }) 
    if(res.data.status==='success'){
        window.setTimeout(()=>{
            location.assign('/search/login');
            },2500)
    }

}
catch(err){
showalert('providee with correct details','try again');
}
}

const formbtn=document.querySelector('.form');
if(formbtn){
formbtn.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const passwordConfirm=document.getElementById('passwordConfirm').value;

signitup(name,email,password,passwordConfirm);
})
    

}


