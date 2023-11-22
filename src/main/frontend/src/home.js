import React from 'react';
import {useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


import { useRecoilState, 
  useRecoilValue, 
  useSetRecoilState, 
  useResetRecoilState 
} from 'recoil';
import userAtom from './common/userAtom';



export default function Home() {

  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');

  const [msg, setMsg] = useState("");

// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputUserId = (e) => {
    setUserId(e.target.value)
  }

  const handleInputUserPwd = (e) => {
    setUserPwd(e.target.value)
  }

  const onClickLogin = (e) => {
     // 버튼만 누르면 리프레시 되는것을 막아줌

    e.preventDefault();
    
    console.log('click login');

    if (!userId) {
      alert("ID를 입력하세요.");
      return;
    }
    else if (!userPwd) {
      alert("Password를 입력하세요.");
      return;
    }

    

    axios.post('/api/auth/token',
    {
      userId :userId,
      password : userPwd

    })
     .then((response) => {
      alert(JSON.stringify(response.data))

      if(response.data.code == "0"){
        alert(response.data.data);
        setUserInfo( response.data.data);   
        goCsList();
      }
      else{
        setMsg(response.data.message);
      }
     })
     .catch(error => console.log(error))

}
  

  const [userInfo, setUserInfo] = useRecoilState(userAtom); 

  const currentUserInfo = useRecoilValue(userAtom); 

  const movePage = useNavigate();

  function goCsList(){
     movePage('/cs/list');
   }


   function greetUser() {
    console.log("Hi there, user!");
    //alert(111);
   
  };

  function byeUser() {
    console.log("bye user!");
    //alert(111);
    setUserInfo( undefined);   
  };

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }

}, [msg]);


  return (
    <div  >
      <div className="container">
       
       <div className="empty"  style={{height: 100 + 'px'}}></div> 
      <div>
            <main role="main" className="pb-3">
              <div className="empty" style={{marginRight: 50 + 'px'}}></div>
              <div className="text-center">
                  <h5 className="display-6">Simple React + Spring boot CS sample</h5>
              </div>
            
            </main>
            
      </div>        

      {/* <div className='bd-example'>
            <div>button sample</div>
            <button type="button" className="btn btn-primary" onClick={() => greetUser("John")} >Primary</button>
            <button type="button" className="btn btn-secondary" onClick={() => byeUser()}>Secondary</button>
            <button type="button" className="btn btn-success">Success</button>
            <button type="button" className="btn btn-danger">Danger</button>
            <button type="button" className="btn btn-warning">Warning</button>
            <button type="button" className="btn btn-info">Info</button>
            <button type="button" className="btn btn-light">Light</button>
            <button type="button" className="btn btn-dark">Dark</button>

            <button type="button" className="btn btn-link">Link</button>
      </div> */}





         {/* {currentUserInfo}<br></br>

        홈 입니다.
        첫 페이지
      <button onClick={goCsList}>CS List으로이동</button>
      1212 */}

    </div>
    <div className="bg-white border rounded-5" style={{marginRight: 50 + 'px', marginLeft: 50 + 'px'}}>
    
    <section className="w-100" >
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100"  >
          <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 my-lg-5 py-lg-5">
              <div className="empty"  style={{height: 30 + 'px'}}></div> 
              <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="userId" >ID</label>
                  <input type="text" className="form-control" id="userId" name="userId" value={userId} onChange={handleInputUserId} placeholder="사용자 ID를 입력하세요." />
             </div>

              
              <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="password" >Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={userPwd} onChange={handleInputUserPwd} placeholder="Password"  />
               </div>
              <div className="text-center">
                  <button type="button" className="btn btn-primary btn-lg" onClick={(event) => onClickLogin(event)} >Login</button>
                  <div ></div>
                  <input type="hidden" name="returnUrl" id="returnUrl"  />
                  <div  style={{height: 30 + 'px'}}></div>
                  {msg ? <div className="alert alert-danger"  role="alert">
                    {msg}
                  </div> :
                  <div></div>
                  }
              </div>
              <div className="empty"  style={{height: 30 + 'px'}}></div> 
          </div>
        </div>
      </div>
    
    </section>

  </div>


    <div className='bottom'>
      <footer className="border-top footer text-muted">
          <div className="container">
              &copy; 2023 - Simple React + Spring boot
          </div>
      </footer>
    </div>
  </div>
  );
}