import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';


import { useRecoilState, 
  useRecoilValue, 
  useSetRecoilState, 
  useResetRecoilState 
} from 'recoil';
import userAtom from '../common/userAtom';
import TopMenu from '../common/topMenu'
import dateFormat, { masks } from "dateformat";


import { PaginationControl } from 'react-bootstrap-pagination-control';




const now = new Date();
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 


export default function CS_list() {
  const movePage = useNavigate();
  const [startDate, setStartDate] = useState(dateFormat(sevenDaysAgo, "yyyy-mm-dd"));
  const [endDate, setEndDate] = useState(dateFormat(now, "yyyy-mm-dd"));


  const [userInfo, setUserInfo] = useRecoilState(userAtom); 
  const currentUserInfo = useRecoilValue(userAtom); 

  const [pageNum, setPageNum] = useState(1)




  function gohome(){
     movePage('/');
   }

   function search() {
   alert(startDate + " / " + endDate);
  };


  return (
    <div className="mypage" >
      <TopMenu/>
      <div className="container" >
       <div className="className">
            <main role="main" className="pb-3">
              <div className="empty" style={{marginRight: 50 + 'px'}}></div>
              <div className="text-left">
                  <h5 className="display-6">CS 목록</h5>
              </div>            
            </main>
        </div>


        <div className='body'>
          {/* 마이페이지 입니다. */}
          {/* <button onClick={gohome}>홈으로이동</button> */}
       

      <section className="w-100 p-4 text-center pb-4">
          <div className="card card-raised mb-5">
              <div className="card-body">
                  <div className="row g-3">
                      <div className="form-floating col-md-3">                      
                          <input className="form-control" type="text"></input>
                          <label>테스트</label>
                      </div>
                      <div className="col-md-3 form-floating" >
                          <Form.Control type="date" name="startDate" value={startDate}  onChange={e => setStartDate( e.target.value )} />
                          <label>시작날짜</label>
                      </div>
                      <div className="col-md-3 form-floating" >
                          <Form.Control type="date" name="endDate" value={endDate}  onChange={e => setEndDate( e.target.value )} />
                          <label>종료날짜</label>
                      </div>
                      
                    
                  </div>
                  <div className="col-md-12 " >
                  </div>
                  <div className="col"></div>
                  <div className="col-auto float-right" >
                      <button type="button" className="btn btn-primary" onClick={() => search()} >검 색</button> &nbsp;
                      <button type="button" className="btn btn-secondary">리 셋</button> &nbsp; 
                      <button type="button" className="btn btn-success" >추가</button> &nbsp;
                  </div>

              </div>
              
              
          </div>
        
      </section>
      <section>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>No</th>
                <th>분류1</th>
                <th>분류2</th>
                <th>제목</th>
                <th>상태</th>
                <th>등록자</th>
                <th>등록일자</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="9">검색된 데이터가 없습니다</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>          
          <PaginationControl    page={pageNum}    between={4}    total={250}    limit={10}    changePage={(pageNum) => { setPageNum(pageNum)    }}    ellipsis={1}  />
        </div>
        </section>



     </div>

      <div className="row">
        <div className="col-md-3">
                 </div>
        <div className="col-md-3">
         
        </div>
        
        <div className="col-md-3">
        {currentUserInfo}
        </div>
      </div>
       
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