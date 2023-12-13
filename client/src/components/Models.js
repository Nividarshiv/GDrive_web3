import React, { useEffect } from "react";
import "./design.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Accesspermission = ({ setModalOpen, state }) => {
  const { contract } = state;
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    console.log(address)
    await contract.allowpermission(address);
    setModalOpen(false)
  }
  const unsharing = async () => {
    const address = document.querySelector(".address").value;
    console.log(address)
    await contract.denaypermission(address);
    setModalOpen(false)
  }
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.showaccesslist();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div id="shareaccess">
        <h3 id="modeheading">Permission Access and Denay</h3>
        <div id="add">
          <input type="text" className="address" placeholder="Enter Address"></input>
        </div>
        <br></br>
        <form id="myForm">
          <select id="selectNumber">
            <option>People With Access</option>
          </select>
        </form>
        <br></br>
        <Container>
          <Row className="justify-content-evenly">
            <Col md={3}><button onClick={sharing} id="btnstyle">Share</button></Col>
            <Col md={3}><button onClick={unsharing} id="btnstyle">UnShare</button> </Col>
            <Col md={3}><button onClick={() => setModalOpen(false)} id="btnstyle">Close</button></Col>
          </Row>
        </Container>
      </div>
    </>

  )
}
export default Accesspermission