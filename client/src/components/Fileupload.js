import React, { useState } from "react";
import axios from "axios";
import "./design.css"


const Fileupload = ({ state, account }) => {
    const { contract } = state;
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");

    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `Pinata_api_key`,
                        pinata_secret_api_key: `Pinata_secret_api_key`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                contract.upload(ImgHash);
                alert("Successfully Image Uploaded");
                setFileName("No image selected");
                setFile(null);

            } catch (error) {
                alert("Unable to upload image to Pinata");
            }
            console.log("Hello")
        }

    }

    return (
        <>
            <div id="fileupload">
                <h3 id="headingupload">Upload Image to Gdrive 3.0</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file-upload" className="choose"> Choose Image</label>
                    <input type="file" id="file-upload" name="data" onChange={retrieveFile} disabled={!account}></input>
                    <span className="textArea">Image: {fileName}</span>
                    <br></br>
                    <button type="submit" className="upload" disabled={!file}> Upload File </button>
                </form>
            </div>
        </>
    )
}
export default Fileupload