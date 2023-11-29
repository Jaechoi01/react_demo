import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./cs_style.css"

const initialIssueState = {
    title: "",
    customerName : "",
    customerContract : "",
    content: ""
  };


function CsInputModal(props) {


    const [issue, setIssue] = useState(initialIssueState);


        const handleIssueChange = e => {

            // form의 이름과  useState이름을 맞춥니다. 
            
            setIssue({
              ...issue,
              [e.target.name]: e.target.value,
            })
          }
    


  const handleClose = () =>{

    
    setIssue(initialIssueState);
    props.onClose();
    

  } 

  return (
      <Modal show={props.show} onHide={props.onClose} style={{marginTop: 100 + 'px'}} contentClassName='cs-modal-style-1'>
        <Modal.Header closeButton >
          <Modal.Title>Cs 이슈 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="form-group row">
            <label for="inputPassword" className="col-sm-3 col-form-label">CS 제목</label>
            <div className="col-sm-9">
                <input className="form-control form-control-sm"  type="text"
                            name="title"
                            value={issue.title}
                            onChange={handleIssueChange} />
            </div>
        </div>
        <div className="form-group row">
            <label for="inputPassword" className="col-sm-3 col-form-label">고객명</label>
            <div className="col-sm-9">
                <input className="form-control form-control-sm"  type="text"
                            name="customerName"
                            value={issue.customerName}
                            onChange={handleIssueChange} />
            </div>
        </div>
        <div className="form-group row">
            <label for="inputPassword" className="col-sm-3 col-form-label">고객연락처</label>
            <div className="col-sm-9">
                <input className="form-control form-control-sm"  type="text"
                            name="customerContract"
                            value={issue.customerContract}
                            onChange={handleIssueChange} />
            </div>
        </div>
        <div class="form-group row" >
            <label for="inputPassword" class="col-sm-3 col-form-label">CS내용</label>
            <div class="col-sm-9" >
            <textarea class="form-control" id="validationTextarea" placeholder="내용을 입력하세요." 
                        name="content"
                        value={issue.content}
                        onChange={handleIssueChange} style={{height:300+ 'px'}}></textarea>
            </div>
        </div>
        {issue.title} -  {issue.customerName} -  {issue.customerContract}   - {issue.content} 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CsInputModal;