import logo from "./assets/logo.png";
import './App.css';
import Card from './components/Card.js'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ReactLoading from "react-loading";
let healthjson = require("./heatlhstatus.json");


function App() {

  const [ips, setIps] = useState(null);
  const [statusPc, setStatusPc] = useState(null);
  const [statusHorus, setStatusHorus] = useState(healthjson);
  const [statusFiles, setStatusFiles] = useState(null);
  const [statusTamanho, setStatusTamanho] = useState(null);
  const [statusSight, setStatusSight] = useState(null);

  const [errStatusFiles, setErrStatusFiles] = useState(true);
  const [errStatusTamanho, setErrStatusTamanho] = useState(true);
  const [errStatusSight, setErrStatusSight] = useState(true);

  const headers = {
    'Content-Type': 'application/json',
  };

  const username_ = "faad25eb8bda40d0bffa519f56ff7b95@iris8.com.br";
  const password_ = "4fad71be-96ef-4728-abd8-ba5e50763cf9";
  const basicAuth = 'Basic ' + btoa(username_ + ":" + password_);
  const base64data = basicAuth.toString('base64');


  async function getData () {

      Axios.get('https://hubiris8-back.herokuapp.com/hubapi/ips')
            .then((response) => {
                setIps(response["data"]);
            })
            .catch((error) => {
                console.log(error);
            });

      Axios.get('https://hubiris8-back.herokuapp.com/hubapi/statuspc')
            .then((response) => {
                setStatusPc(response["data"]);
            })
            .catch((error) => {
                console.log(error);
            });

      Axios.get('https://hubiris8-back.herokuapp.com/hubapi/statusfiles')
            .then((response) => {
                setStatusFiles(response["data"]);
                setErrStatusFiles(false);
            })
            .catch((error) => {
                console.log(error);
            });

      Axios.get('https://hubiris8-back.herokuapp.com/hubapi/tamanhofiles')
            .then((response) => {
              setStatusTamanho(response["data"]);
              setErrStatusTamanho(false);
            })
            .catch((error) => {
                console.log(error);
            });
  }

  function filterData (dic, id) {
    let dicFinal = [];
    for (let u in dic){
      if (dic[u]["id"] === id){
        dicFinal.push(dic[u]);
      }
    }
    return (dicFinal);
  }

  function filterDataAPI (id){
    
    for (let u in statusHorus){
      if (statusHorus[u]["ip"].split(".")[3] === id.toString()){
        return statusHorus[u];
      }
    }
    return [];
  }


  const cLog = () => {
    //console.log(shoppings);
    //console.log(statusPc);
    //console.log(statusFiles);
    //console.log(statusTamanho);
    console.log(statusSight);
  }

  useEffect(() => {

    getData();

    console.log(statusTamanho)
    console.log(statusSight)

  }, []);

  return (
    <div style={{display:"flex", flexDirection:"column", width:"100% !important", height:"100% !important", fontFamily: 'Comfortaa, cursive'}}>
      <div style={{display:"flex", flexDirection:"row", alignItems:"center", position:"fixed", width:"100%", height:"50px", backgroundColor:"#DFE0E2",
                   boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", zIndex:"2"}}>
        <div>
          <h2 style={{position:"relative", left:"15px", top:"0", fontSize:"15px"}}>Central de monitoramento</h2>
        </div>
        <div style={{position:"fixed", right:"0"}}>
          <img src={logo} style={{height:"38px", marginTop:"1px", marginRight:"0.5vh"}}/>
        </div>
      </div>
      <div style={{width:"100%", height:"50px"}}></div>
      <div style={{position:"relative", display:"flex", flexDirection:"row", flexFlow:"row wrap", width:"100%"}}>
        
      {ips ? (ips.map(u => {
                    return (
                      <Card 
                        ip = {u["id"]}
                        statusPc = {filterData(statusPc, u["id"])}
                  
                        horusHealthStatus = {filterDataAPI(u["id"])}
                        errHorusHealthStatus = {false}

                        statusFiles = {filterData(statusFiles, u["id"])}
                        errStatusFiles = {errStatusFiles}

                        statusTamanho = {filterData(statusTamanho, u["id"])}
                        errStatusTamanho = {errStatusTamanho}

                        statusSight = {filterData(statusSight, u["id"])}
                        errStatusSight = {errStatusSight}
                      ></Card>
                    )})):(
                      <div style={{width:"100%", height:"100vh", backgroundColor:"gray", opacity:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                          <ReactLoading type={"spin"} color={"black"} />
                      </div>
                    )}

      </div>
    </div>
  );
}

export default App;
