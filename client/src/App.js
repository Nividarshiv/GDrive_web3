import { useState, useEffect } from "react";
import abi from "./contractabi/Imageuploading.json"
import { ethers } from "ethers";
import Fileupload from "./components/Fileupload";
import Filedisplay from "./components/FileDisplay";
import Accesspermission from "./components/Models";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState('Not connected');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const template = async () => {
      const contractAddres = "Contract Address";
      const contractABI = abi.abi;
      try {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log(account)

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
        setState({ provider, signer, contract });

      } catch (error) {
        console.log(error)
      }
    }
    template();
  }, [])

  return (
    <>
      <div id="animated-gradient">
        <h1>Gdrive 3.0</h1>
        <p>Account Connect : {account}</p>
        <Container>
          <Row className="justify-content-evenly mt-5">
            <Col md={5} id="backcolor"> <Fileupload state={state} account={account}></Fileupload></Col>
            <Col md={5} id="backcolor">
              {!modalOpen &&
                <button className="share" onClick={() => setModalOpen(true)}>
                  Share
                </button>
              }
              {modalOpen &&
                <Accesspermission setModalOpen={setModalOpen} state={state}> </Accesspermission>
              }
            </Col>
          </Row>
          <Filedisplay state={state} account={account}></Filedisplay>
        </Container>

      </div>

    </>
  );
}

export default App;
