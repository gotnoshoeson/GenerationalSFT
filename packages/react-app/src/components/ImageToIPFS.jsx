import React, { useState } from "react";
import { Button, Input, Col, Row, Spin, Card, Form } from 'antd';

const { ethers } = require("ethers");
const { BufferList } = require('bl');
const ipfsClient = require('ipfs-http-client');

const { REACT_APP_INFURA_ID, REACT_APP_INFURA_SECRET } = process.env;
const projectId = REACT_APP_INFURA_ID;
const projectSecret = REACT_APP_INFURA_SECRET;

const auth =
    'Basic ' + btoa(projectId + ':' + projectSecret);

const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


export default function ImageToIPFS(props) {
    const currentGeneration = ethers.utils.formatUnits(props.value, 0);
    const tx = props.tx;
    const tokenFee = props.tokenFee;
    const readContracts = props.readContracts;
    const writeContracts = props.writeContracts;
    const [ selectedFile, setSelectedFile ] = useState();
	const [ isSelected, setIsSelected ] = useState(false);
    //const [ url, setURL ] = useState("");
    const [tokenGenFee, setTokenGenFee] = useState({
        valid: false,
        value: ''
      });
    // borrowed from other project, remove later
    const [buying, setBuying] = useState();

    // IPFS Bits:
    const [ sending, setSending ] = useState()
    const [ ipfsHash, setIpfsHash ] = useState()
    const [ ipfsMetadataHash, setIpfsMetadataHash ] = useState()
    //const [ ipfsContents, setIpfsContents ] = useState()
    const [ buffer, setBuffer ] = useState()

    const metaData = {
        name: "FanSociety",
        description: "Generation #"+String(currentGeneration),
        image: "://ipfs/"+String(ipfsHash)
    }

    const addToIPFS = async (fileToUpload) => {
        const result = await ipfs.add(fileToUpload)
        return result
    }

/*     const asyncGetFile = async ()=>{
        let result = await getFromIPFS(ipfsHash)
        setIpfsContents(result.toString())
    } */

    const getFromIPFS = async hashToGet => {
        for await (const file of ipfs.get(hashToGet)) {
            console.log(file.path)
            if (!file.content) continue;
            const content = new BufferList()
            for await (const chunk of file.content) {
                content.append(chunk)
            }
            console.log(content)
            return content
        }
    }

    /* useEffect(()=>{
        if(ipfsHash) asyncGetFile()
    },[ipfsHash])

    let ipfsDisplay = ""
    if(ipfsHash){
        if(!ipfsContents){
            ipfsDisplay = (
                <Spin />
            )
        }else{
            ipfsDisplay = (
                <pre style={{margin:8,padding:8,border:"1px solid #dddddd",backgroundColor:"#ededed"}}>
                {ipfsContents}
                </pre>
            )
        }
    } */

    const changeHandler = async (event) => {

		setSelectedFile(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result))
            console.log("buffer: ", buffer)
        }
		setIsSelected(true);
	};

    return (
        <div style={{margin:'32px'}}>
            <h3 > Image Handling:</h3>
                <Form>
                    <Input 
                    type="file"
                    accept="image/*"
                    onChange={changeHandler}
                    />
                    <Button
                    type="primary"
                    disabled={!selectedFile}
                    onClick={ async () => {
                        console.log("UPLOADING...")
                        setSending(true)
                        console.log(currentGeneration)

                        const result = await addToIPFS(selectedFile)
                        if(result && result.path) {
                            console.log(result)
                            console.log(result.path)
                            setIpfsHash(result.path)
                        }
                        setSending(false)
                    }}>
                    Upload Image to IPFS
                    </Button>
                    <Button
                    type="primary"
                    disabled={!selectedFile}
                    onClick={ async () => {
                        console.log("UPLOADING...")
                        setSending(true)

                        const json = JSON.stringify(metaData)
                        const metaDataResult = await addToIPFS(json)
                        if(metaDataResult && metaDataResult.path) {
                            console.log(metaDataResult)
                            setIpfsMetadataHash(metaDataResult.path)
                        }
                        setSending(false)
                    }}>
                    Upload Metadata to IPFS
                    </Button>
                </Form>
                         
            <Row justify="center" >
                <Col span={100}>
                    <Card >
                        {ipfsHash ? (
                            <img src={"https://ipfs.io/ipfs/"+ipfsHash} style={{width:"200px"}}/>
                        ) : (
                            <p >{""}</p>
                        )}
                    </Card>
                </Col>
                <Col span={100}>
                    <div><a href={"https://ipfs.io/ipfs/"+ipfsHash} target="blank">{ipfsHash}</a></div>
                    <div><a href={"https://ipfs.io/ipfs/"+ipfsMetadataHash} target="blank">{ipfsMetadataHash}</a></div>
                </Col>
            </Row>
            <div style={{ padding: 8 }}>Current token generation: {currentGeneration && ethers.utils.formatUnits(currentGeneration, 0)}</div>
              <div style={{ padding: 8 }}>
                <Input
                  style={{ textAlign: "center" }}
                  placeholder={"new generation token fee"}
                  value={tokenGenFee.value}
                  onChange={e => {
                    const newValue = e.target.value.startsWith(".") ? "0." : e.target.value;
                    const buyAmount = {
                      value: newValue,
                      valid: /^\d*\.?\d+$/.test(newValue)
                    }
                    setTokenGenFee(buyAmount);
                  }}
                />
              </div>

              <div style={{ padding: 8 }}>
                <Button
                  type={"primary"}
                  loading={buying}
                  onClick={async () => {
                    setBuying(true);
                    await tx(writeContracts.YourContract.createGeneration(ethers.utils.parseEther(tokenGenFee.value), ipfsMetadataHash));
                    setBuying(false);
                  }}
                  disabled={!tokenGenFee.valid}
                >
                  Create New Gen
                </Button>
              </div>
        </div>
        
    );
}