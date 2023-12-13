import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Filedisplay = ({ state, account }) => {
  const { contract } = state;
  const [data, setData] = useState("");

  const getdata = async () => {
    const Otheraddress = document.querySelector("#address").value;
    let dataarray;
    console.log(account)
    try {
      if (Otheraddress) {
        dataarray = await contract.display(Otheraddress);
        console.log(dataarray);

      } else {
        dataarray = await contract.display(account);
        console.log(dataarray);

      }
    } catch (error) {
      alert(error)
    }
    const isEmpty = Object.keys(dataarray).length === 0;

    if (!isEmpty) {
      const images = dataarray.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={item}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <div id="displayimg">
        <input type="text" placeholder="Enter Address" id="address"></input>
        <br></br><br></br>
        <button className="center button" id="btnstyle" onClick={getdata}> Get Data </button>
      </div>
    </>
  )
}
export default Filedisplay