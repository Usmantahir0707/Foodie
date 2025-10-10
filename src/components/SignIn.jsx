import Modal from "./Modal";
import Input from "./Input";
import vector from "../assets/vector.png";
import google from "../assets/google.png";
import PhoneInput from "./PhoneInput";
import { useState } from "react";
import { useFirebase } from "../contexts/fireBaseContext";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";


export default function SignIn() {
  const navigate = useNavigate()
  const firebase = useFirebase()
   const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState({});
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
    const errorObj = {}

    if(userData.phoneNumber.length > userData.codeLength && userData.phoneNumber.length < userData.numberLength + userData.codeLength){
      errorObj.phoneNumber = 'Please enter a valid number!'
    }
    if(userData.phoneNumber.length <= userData.codeLength){
      errorObj.phoneNumber = 'Phone number is required!'
    }
    if(userData.password.length < 1){
      errorObj.password = 'password is required!';
    }
    if(userData.password.length > 1 && !pattern.test(userData.password)){
      errorObj.password = 'Include Upper, Lower and Number!'
    }
    if(userData.password.length > 1 && userData.password.length < 8){
      errorObj.password = 'Must be atleast 8 characters!'
    }
    
    setError(errorObj)
    
    if(Object.keys(errorObj).length > 0) return

    const loginUser = async ()=>{
      const email = `${userData.phoneNumber.slice(1)}@example.com`;
      const password = userData.password;
     
      try{
        const userLogin = await firebase.loginUserWithEmail(email, password)
        navigate('/home')
      }
      catch(e){
        console.log(e)
      }
    }
    loginUser()
 }

  return (
    <Modal heading={"Login"}>
      {
          changePassword ? <UpdatePassword setChangePassword={setChangePassword}/> : ''
        }
      <form onSubmit={(e)=> handleSubmit(e)} className="flex flex-col justify-center gap-3">
        <div className={`relative ${error.phoneNumber ? 'mb-6' : ''} transition-[margin] duration-300`}>
          <PhoneInput
        userData={userData}
        setUserData={setUserData}
        setError={setError}
      />
      {!error.phoneNumber ? '' : 
      <div className="absolute text-[red]">{error.phoneNumber}</div>
      }
        </div>
        

      <div role="wrapper" className="relative flex w-[100%] justify-center">
        <div className={`relative ${error.password ? 'mb-5' : ''} transition-[margin] duration-300`}>
          <Input
          tailInput='text-[16px]'
          value={userData.password}
          tail=" w-full h-[50px]"
          onChange={(e) => {
            setUserData((p) => ({ ...p, password: e.target.value }))
            setError((p)=>{
              const {password, ...rest} = p
              return rest
            })
          }}
          startIcon={"lock"}
          maxLength={14}
          placeholder={"password"}
          endIcon={"eye"}
        />
        {!error.password ? '' : 
      <div className="absolute text-[red]">{error.password}</div>
      }
        </div>
        {
          error.password ? '' : 
          <span onClick={()=> setChangePassword(true)}
           className="absolute bottom-[-27px] left-2 text-[14px]">
          forgot password? 
        </span>
        }
        
        
      </div>

      <button className={` h-[45px] w-[255px] bg-[#EC2578] text-white active:scale-[97%] ${
        error.password ? 'mt-6' : 'mt-10'} transition-[margin] duration-300`}>
        Login
      </button>
      </form>
      
      <span className="text-[#EC2578]">or</span>
      <div className="flex gap-2">
        <img
          className="rounded-2xl bg-blue-900 px-[12px] py-1"
          src={vector}
          alt=""
        />
        <img src={google} alt="" />
      </div>
    </Modal>
  );
}
