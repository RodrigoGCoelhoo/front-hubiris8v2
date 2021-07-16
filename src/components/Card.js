import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Card.css';
import { useState, useEffect } from 'react';
import ReactLoading from "react-loading";

function Card(props) {

    const BG = "#DFE0E2"; //#01c1d4
    const RED = "#DE1A1A";
    const GREEN = "#09E85E";
    const YELLOW = "#F0A202";

    const VAR_MAX_TAMANHO_FILES = 0.3;
    const VAR_MAX_QUANT_ALTERACOES = 0.2;

    const headers = {
        'Content-Type': 'text/plain'
    };

    const [loading, setLoading] = useState(true);
    const [lastDataStatusFile, setLastDataStatusFile] = useState(null)

    // Vars computador

    const [boolCPU, setBoolCPU] = useState(false);
    const [boolRAM, setBoolRAM] = useState(false);
    const [boolArmazenamento, setBoolArmazenamento] = useState(false);
    const [errComp, setErrComp] = useState(0);
    const [boolErrComp, setBoolErrComp] = useState(true);
    const [boolShowErrComp, setBoolShowErrComp] = useState(false);

    // Vars status horus

    const [boolMedia, setBoolMedia] = useState(true);
    const [dataMedia, setDataMedia] = useState("2000-01-01");
    const [nCreated, setNCreated] = useState(0);
    const [nDeleted, setNDeleted] = useState(0);
    const [mediaCreated, setMediaCreated] = useState(0);
    const [mediaDeleted, setMediaDeleted] = useState(0);

    const [listBoolCheckHorus, setListBoolCheckHorus] = useState([]);
    const [errHorus, setErrHorus] = useState(0);
    const [boolErrHorus, setBoolErrHorus] = useState(true);
    const [boolShowErrHorus, setBoolShowErrHorus] = useState(false);

    // Vars modulo tamanho

    const [boolTamanho, setBoolTamanho] = useState(true);
    const [dataTamanho, setDataTamanho] = useState(null);
    const [dicSoma, setDicSoma] = useState(null);
    const [dicQuant, setDicQuant] = useState(null);
    const [dicAtuais, setDicAtuais] = useState(null);
    const [dicMedias, setDicMedias] = useState(null);
    let listaPOI = [];
    const [errTamanho, setErrTamanho] = useState(0);
    const [boolErrTamanho, setBoolErrTamanho] = useState(true);
    const [boolShowErrTamanho, setBoolShowErrTamanho] = useState(false);

    // Vars modulo sight

    const [listBoolCheckSight, setListBoolCheckSight] = useState([]);
    const [errSight, setErrSight] = useState(0);
    const [boolErrSight, setBoolErrSight] = useState(true);
    const [boolShowErrSight, setBoolShowErrSight] = useState(false);

    // Vars toogle modulos

    let [moduloStatusPC, setModuloStatusPC] = useState(false);
    let [arrowStatusPC, setArrowStatusPC] = useState(">");

    let [moduloStatusHorus, setModuloStatusHorus] = useState(false);
    let [arrowStatusHorus, setArrowStatusHorus] = useState(">");

    let [moduloStatusTamanho, setModuloStatusTamanho] = useState(false);
    let [arrowStatusTamanho, setArrowStatusTamanho] = useState(">");

    let [moduloStatusCamerasPretas, setModuloStatusCamerasPretas] = useState(false);
    let [arrowStatusCamerasPretas, setArrowStatusCamerasPretas] = useState(">");

    let [moduloStatusSight, setModuloStatusSight] = useState(false);
    let [arrowStatusSight, setArrowStatusSight] = useState(">");

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
    
    // Functions CPU

    function progressBar (percent, width) {

        const BGBAR = "#565554"; //#DFE0E2
        percent = percent/100;
        var widthOut = width;
        var widthIn = width * percent;
        let color = YELLOW; //amarelo
        if (percent >= 0.95){
            color = RED; //vermelho
        } else if (percent <= 0.5) {
            color = GREEN //verde
        }
        return(
        <div style={{width: widthOut + 50 + "px", height:"25px", display:"flex", flexDirection:"row", alignItems:"center", margin:"5px"}}>
            <div style={{width: widthOut + "px", height:"20px", backgroundColor:BGBAR, borderRadius:"100px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <div style={{left:'10px', width:width-5, height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", justifyItems:"center"}}>
                    <div style={{width: widthIn - 5 + "px", height:"15px", backgroundColor:color, display:"flex",borderRadius:"100px", alignSelf:"flex-start", justifySelf:"center"}}>

                    </div>
                </div>
            </div>
            <text style={{fontSize:"90%", marginLeft:"10px"}}>{Math.round(percent*100) + "%"}</text>
        </div>
    )}

    function boolCountSwitchComp(percent, boolCheck, setBoolCheck){
        percent = percent/100
        if (percent >= 0.95){
            if (!boolCheck){
                setBoolCheck(true)
            }
        }
    }

    function countErrCPU(){
        sleep(1000).then(() => {
        let l = 0;
        if (boolCPU){
            l = l + 1;
        }
        if (boolRAM){
            l = l + 1;
        }
        if (boolArmazenamento){
            l = l + 1;
        }
        setErrComp(l);
        setBoolShowErrComp(true);
    })};

    // Functions Horus

    function textHealthOperation(running, number) {
        return(
            <div>
                {running === number ? (
                <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <div style={{background:GREEN, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px", borderColor:"black"}}></div>
                    <text style={{fontSize:"80%"}}>Em operação: {running}/{number}</text>
                </div>
                ):(
                <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <div style={{background:RED, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px"}}></div>
                    <text style={{fontSize:"80%"}}>Em operação: {running}/{number}</text>
                </div>)}
            </div>)}

    function textHealthSeconds(seconds) {
        return(
        <div>
            {seconds < 300 ? (
            <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{background:GREEN, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px", borderColor:"black"}}></div>
                <text style={{fontSize:"80%"}}>Última atualização: {seconds} seg.</text>
            </div>
            ):(
            <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{background:RED, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px"}}></div>
                <text style={{fontSize:"80%"}}>Última atualização: {seconds} seg.</text>
            </div>)}
        </div>)}

    function textHealthReset(hours) {
        return(
        <div>
            {hours < 24 ? (
            <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{background:GREEN, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px", borderColor:"black"}}></div>
                <text style={{fontSize:"80%"}}>Último reset: {hours}h</text>
            </div>
            ):(
            <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{background:RED, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px"}}></div>
                <text style={{fontSize:"80%"}}>Último reset: {hours}h</text>
            </div>)}
        </div>)}
    
    function textHealthQueue(fila) {
        return(<div>
            {fila < 10 ? (
            <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{background:GREEN, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px", borderColor:"black"}}></div>
                <text style={{fontSize:"80%"}}>Fila de processamento: {fila}</text>
            </div>
            ):(
            <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{background:RED, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px"}}></div>
                <text style={{fontSize:"80%"}}>Fila de processamento: {fila}</text>
            </div>)}
        </div>)}

    function geraMediaStatusFiles(dados) {
        let dataRecente = new Date("2000-01-01");
        let nRecente;
        for (let n in dados){
            let dataRaw = dados[n]["data"].slice(0,10)
            let ano = dataRaw.split("-")[0]
            let mes = String(parseInt(dataRaw.split("-")[1])-1)
            let dia = dataRaw.split("-")[2]
            let dataMid = new Date(ano, mes, dia)
            if (dataMid > dataRecente) {
                dataRecente = dataMid
                nRecente = n
            }
        }

        setDataMedia(dataRecente.toISOString())
        setNCreated(dados[nRecente]["created"]);
        setNDeleted(dados[nRecente]["deleted"]);

        let somaCreated = 0;
        let somaDeleted = 0;
        let quantidade = dados.length - 1

        for (let n in dados) {
            let dataRaw = dados[n]["data"].slice(0,10)
            let ano = dataRaw.split("-")[0]
            let mes = String(parseInt(dataRaw.split("-")[1])-1)
            let dia = dataRaw.split("-")[2]
            let dataMid = new Date(ano, mes, dia)

            if (dataMid.getFullYear() != dataRecente.getFullYear() || dataMid.getMonth() != dataRecente.getMonth() || dataMid.getDate() != dataRecente.getDate()){

                somaCreated += dados[n]["created"]
                somaDeleted += dados[n]["deleted"]

            }
        }

        setMediaCreated(Math.round(somaCreated/quantidade));
        setMediaDeleted(Math.round(somaDeleted/quantidade));

        setBoolMedia(false);
       }

    function pintaMedia(unico, media){
        let col = "#rgba(0, 0, 0, 0)"
        let colT = "black"
        if (unico > media*(1+VAR_MAX_QUANT_ALTERACOES) || unico < media*(1-VAR_MAX_QUANT_ALTERACOES)){
            col = "rgba(222, 26, 26, 0.8)"
            colT = "white"
        }

        return(
            <div style={{backgroundColor:col, padding:"1px", paddingLeft:"4px", paddingRight:"4px"}}>
                <text style={{color:colT}}>{unico}</text>
            </div>)
        }

    function boolCountSwitchHorus(prop_) {

        function listCheckPush(checkName){
            if (!listBoolCheckHorus.includes(checkName)){
                let l = listBoolCheckHorus
                l.push(checkName)
                setListBoolCheckHorus(l)
            }
        }

        if (prop_["runningWorkers"] !== prop_["workerNumber"]){
            listCheckPush("runningWorkers")
        }

        if (prop_["runningCaptures"] !== prop_["captureNumber"]){
            listCheckPush("runningCaptures")
        }

        if (prop_["secondsFromLastWorkerHeatBeat"] > 300){
            listCheckPush("secondsFromLastWorkerHeatBeat")
        }

        if (prop_["secondsFromLastCaptureHeatBeat"] > 300){
            listCheckPush("secondsFromLastCaptureHeatBeat")
        }

        if (prop_["captureLastReset"] > 24){
            listCheckPush("captureLastReset")
        }

        if (prop_["workerLastReset"] > 24){
            listCheckPush("workerLastReset")
        }

        if (prop_["queueSize"] > 100){
            listCheckPush("queueSize")
        }

        if (nCreated > mediaCreated*(1+VAR_MAX_QUANT_ALTERACOES) || nCreated < mediaCreated*(1-VAR_MAX_QUANT_ALTERACOES)){
            listCheckPush("createdOut")
        }

        if (nDeleted > mediaDeleted*(1+VAR_MAX_QUANT_ALTERACOES) || nDeleted < mediaDeleted*(1-VAR_MAX_QUANT_ALTERACOES)){
            listCheckPush("deletedOut")
        }

        if (boolErrHorus){
            txtErrHorus()
        }
    }

    function txtErrHorus(){
        sleep(1000).then(() => {
            setErrHorus(listBoolCheckHorus.length);
            setBoolErrHorus(false);
            setBoolShowErrHorus(true);
        });
    }

    // Functions Tamanho

    function dataStatusTamanho(dados){
        if (dados.length > 0){
            sleep(1000).then(() => {
            let dataRecente = new Date("2000-01-01");
            let nRecente;
            for (let n in dados){
                let dataRaw = dados[n]["data"].slice(0,10)
                let ano = dataRaw.split("-")[0]
                let mes = String(parseInt(dataRaw.split("-")[1])-1)
                let dia = dataRaw.split("-")[2]
                let dataMid = new Date(ano, mes, dia)
                //console.log(dataMid)
                if (dataMid > dataRecente) {
                    dataRecente = dataMid
                    nRecente = n
                }
            }

            //console.log(dados);

            setDataTamanho(dataRecente)
            //console.log(dataRecente)

            let dicSomaTamanhos = {};
            let dicQuantTamanhos = {};
            let dicAtuais = {};

            for (let n in dados) {
                let dataRaw = dados[n]["data"].slice(0,10)
                let ano = parseInt(dataRaw.split("-")[0])
                let mes = parseInt(dataRaw.split("-")[1])-1
                let dia = parseInt(dataRaw.split("-")[2])
                let poi = dados[n]["poi"]

                //console.log(poi)
                
                //console.log(typeof dataRecente.getFullYear())
                //console.log(typeof ano)

                //console.log(dataRecente.getMonth())
                //console.log(mes)

                //console.log(dataRecente.getDate())
                //console.log(dia)

                if (ano.toString() != dataRecente.getFullYear() || mes.toString() != dataRecente.getMonth() || dia.toString() != dataRecente.getDate()){
                    //console.log("entrou")
                    if (dicSomaTamanhos.hasOwnProperty(poi)) {
                        dicSomaTamanhos[poi] += dados[n]["mb"];
                        dicQuantTamanhos[poi] += 1;
                    } else {
                        dicSomaTamanhos[poi] = dados[n]["mb"];
                        dicQuantTamanhos[poi] = 1;
                    }
                } else {
                    dicAtuais[poi] = dados[n]["mb"]
                }
            }

            setDicAtuais(dicAtuais);
            setDicSoma(dicSomaTamanhos);
            setDicQuant(dicQuantTamanhos);
            setBoolTamanho(false)
            })}
    }

    function mediaStatusTamanho(){

        if (dicSoma !== {} && dicQuant) {

        let dicMedias = {};

        for (var key in dicSoma){
            dicMedias[key] = dicSoma[key]/dicQuant[key]
        }

        setDicMedias(dicMedias);
        setDicSoma(null);
    }
    }

    function listaFinalTamanhos(){
        for (let u in dicAtuais){
            if (dicAtuais[u] > dicMedias[u]*(1 + VAR_MAX_TAMANHO_FILES) || dicAtuais[u] < dicMedias[u]*(1 - VAR_MAX_TAMANHO_FILES)){
                listaPOI.push(u)
        }
        //console.log(listaPOI)
    }}

    function txtErrTamanho(){
        sleep(1000).then(() => {
            setErrTamanho(listaPOI.length);
            setBoolErrTamanho(false);
            if (listaPOI.length > 0){
            setBoolShowErrTamanho(true);}
        });
    }

    // Functions Sight

    function estadoSight (estado) {

        let texto = "Ligado";
        let color = GREEN;

        if (estado === "desligado"){
            texto = "Desligado"
            color = RED
        }

        return (
            <div style={{padding:"2px", paddingLeft:"4px", paddingRight:"4px", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{background:color, borderRadius:"100px", width:"10px", height:"10px", marginRight:"5px", borderColor:"black"}}></div>
                <text style={{fontSize:"90%"}}>{texto}</text>
            </div>)
        }



    function boolCountSwitchSight(prop_) {

        function listCheckPush(checkName){
            if (!listBoolCheckSight.includes(checkName)){
                let l = listBoolCheckSight
                l.push(checkName)
                setListBoolCheckSight(l)
            }
        }

        for (let u in prop_){
            if (prop_[u]["status"] === "desligado"){
                listCheckPush(prop_[u]["poi"])
            }
        }
        
    }

    function txtErrSight(){
        sleep(1000).then(() => {
            setErrSight(listBoolCheckSight.length);
            setBoolErrSight(false);
            if (listBoolCheckSight.length > 0){
            setBoolShowErrSight(true);}
        });
    }

    // Functions Infra

    function switchToggleArrow(modulo, setModulo, setArrow){
        if (modulo === true){
            setModulo(false);
            setArrow(">")
        }
        if (modulo === false){
            setModulo(true);
            setArrow("v")
        }
    }

    function checkLoading() {
        if (props.horusHealthStatus && props.statusPc && props.statusTamanho && props.statusFiles && props.statusSight){
            setLoading(false);
        }
    }

    function erroBanco(){
        return(
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginBottom:"10px", marginTop:"10px"}}>
                <text style={{fontSize:"90%"}}>Sem conexão com o banco de dados.</text>
            </div>
        )
    }

    function dataIso2Br(dataIso){
        let ano = dataIso.slice(0,4)
        let mes = dataIso.slice(5,7)
        let dia = dataIso.slice(8,10)
        return (dia + "/" + mes + "/" + ano)
    }

    function warnings(err){
        if (err > 0){
        return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", backgroundColor:RED, borderRadius:"100px", width:"18px", height:"18px", marginLeft:"10px"}}>
        <text style={{color:BG, fontWeight:"bolder", fontSize:"80%"}}>{err}</text>
    </div>)}
    }
    

  return (
    <div>
    {loading ? (
        <div style={{width:"400px", minHeight:"294px", backgroundColor:"gray", margin:"20px", fontFamily:"Arial", padding:"10px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", opacity:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
            {checkLoading()}
            <ReactLoading type={"bars"} color={"black"} />
        </div>
    ):(
    <div style={{width:"400px", backgroundColor:BG, margin:"20px", fontFamily:"Arial", padding:"10px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", display:"flex", flexDirection:"column"}}>        
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <h4 style={{marginTop:"5px", marginBottom:"10px"}}>{"172.18.20." + props.ip}</h4>
        </div>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <h4 style={{margin:"0px"}}>Computador</h4>
                {props.statusPc.length !== 0 && (
                    <div>
                {props.statusPc && (boolCountSwitchComp(props.statusPc[0]["cpu"], boolCPU, setBoolCPU))}
                {props.statusPc && (boolCountSwitchComp(props.statusPc[0]["ram"], boolRAM, setBoolRAM))}
                {props.statusPc && (boolCountSwitchComp(parseFloat(props.statusPc[0]["usedDisk"])*100/parseFloat(props.statusPc[0]["totalDisk"]), boolArmazenamento, setBoolArmazenamento))}
                {(boolCPU || boolRAM || boolArmazenamento) && props.statusPc && (countErrCPU())}
                {boolShowErrComp && (
                    warnings(errComp)
                )}
                </div>)}
            </div>
            <button onClick={() => switchToggleArrow(moduloStatusPC, setModuloStatusPC, setArrowStatusPC)}
                    style={{fontSize:"70%", width:"20px", height:"20px", borderRadius:"100px", borderColor:"black", marginBlock:"5px", border:"1px solid black"}}>{arrowStatusPC}</button>
        </div>
        <div style={{height:"2px", width:"100%", borderColor:"black", backgroundColor:"black", opacity:"50%", marginBottom:"10px"}}></div>
        <div style={{display:"flex", flexDirection:"column"}}>
            {moduloStatusPC && ( <div>
            {props.statusPc.length !== 0 ? (
            <div>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"10px"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <text style={{fontWeight:"bolder", fontSize:"90%"}}>CPU:</text>
                        {progressBar(props.statusPc[0]["cpu"], 145)}
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <text style={{fontWeight:"bolder", fontSize:"90%"}}>RAM:</text>
                        {progressBar(props.statusPc[0]["ram"], 145)}
                    </div>
                </div>
                    <div style={{display:"flex", flexDirection:"column", marginTop:"10px", marginBottom:"10px"}}>
                        <text style={{fontWeight:"bolder", fontSize:"90%"}}>Armazenamento:</text>
                        {progressBar(parseFloat(props.statusPc[0]["usedDisk"])*100/parseFloat(props.statusPc[0]["totalDisk"]), 350)}
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", width:"90%"}}>
                            <text style={{fontSize:"75%"}}>Total: {props.statusPc[0]["totalDisk"]} Gb</text>
                            <text style={{fontSize:"75%"}}>Usado: {props.statusPc[0]["usedDisk"]} Gb</text>
                            <text style={{fontSize:"75%"}}>Livre: {props.statusPc[0]["freeDisk"]} Gb</text>
                        </div>
                    </div>
                <div style={{display:"flex", flexDirection:"columns", alignItems:"center", justifyContent:"flex-end", marginBottom:"10px", marginTop:"15px"}}>
                    <text style={{fontSize:"65%"}}>Último update: {dataIso2Br(props.statusPc[0]["data"].slice(0,10))}</text>
                </div>
            </div>
            ):(
                erroBanco()
            )}
            </div>
            )}

        </div>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <h4 style={{margin:"0px"}}>Horus</h4>
                {props.horusHealthStatus && (boolCountSwitchHorus(props.horusHealthStatus))}
                {boolErrHorus && (txtErrHorus)}
                {boolShowErrHorus && (
                    warnings(errHorus)
                )}
                
        </div>
        <button onClick={() => switchToggleArrow(moduloStatusHorus, setModuloStatusHorus, setArrowStatusHorus)}
                style={{fontSize:"70%", width:"20px", height:"20px", borderRadius:"100px", borderColor:"black", marginBlock:"5px", border:"1px solid black"}}>{arrowStatusHorus}</button>
        </div>
        <div style={{height:"2px", width:"100%", borderColor:"black", backgroundColor:"black", opacity:"50%", marginBottom:"10px"}}></div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        {props.horusHealthStatus.length === 0 && moduloStatusHorus && (
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginBottom:"5px", marginTop:"10px"}}>
                <text style={{fontSize:"90%"}}>Este servidor não possui Horus.</text>
            </div>
        )}
        {props.horusHealthStatus.length !== 0 && props.horusHealthStatus !== "erro" && moduloStatusHorus &&(
        <div tyle={{display:"flex", flexDirection:"column", width:"100%"}}>
            <div style={{display:"flex", flexDirection:"row", width:"100%", alignItems:"flex-start", justifyContent:"space-around", marginTop:"15px",}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"5px"}}>Workers</text>
                    {textHealthOperation(props.horusHealthStatus["runningWorkers"], props.horusHealthStatus["workerNumber"])}
                    {textHealthSeconds(props.horusHealthStatus["secondsFromLastWorkerHeatBeat"])}
                    {textHealthReset(props.horusHealthStatus["workerLastReset"])}
                    {textHealthQueue(props.horusHealthStatus["queueSize"])}
                </div>
                <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
                    <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"5px"}}>Captures</text>
                    {textHealthOperation(props.horusHealthStatus["runningCaptures"], props.horusHealthStatus["captureNumber"])}
                    {textHealthSeconds(props.horusHealthStatus["secondsFromLastCaptureHeatBeat"])}
                    {textHealthReset(props.horusHealthStatus["captureLastReset"])}
                </div>
            </div>
        </div>
        )}
        { moduloStatusHorus && (
        <div style={{width:"60%", height:"2px", backgroundColor:"black", opacity:"30%", marginTop:"15px", marginBottom:"15px"}}>
        </div>)}
        {props.errStatusFiles && moduloStatusHorus ? (
            erroBanco()
        ):(<div>
        {props.statusFiles && props.statusFiles.length !== 0 && moduloStatusHorus && (
        <div style={{display:"flex", flexDirection:"row", width:"100%", alignItems:"center", justifyContent:"space-around"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
                {boolMedia && (geraMediaStatusFiles(props.statusFiles))}
                {props.statusFiles && props.statusFiles !== "erro" && (boolCountSwitchHorus(props.statusFiles))}
                {props.statusFiles && props.statusFiles !== "erro" && moduloStatusHorus && (
                    <div style={{display:"flex", flexDirection:"column", width:"100%", marginBottom:"10px"}}>
                        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around", width:"100%"}}>
                            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                <text style={{fontWeight:"bolder", marginBottom:"5px", fontSize:"90%"}}>Modificação</text>
                                <text style={{fontSize:"80%"}}>Arquivos criados</text>
                                <text style={{fontSize:"80%"}}>Arquivos apagados</text>
                            </div>
                            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginLeft:"20px"}}>
                                <text style={{fontWeight:"bolder", marginBottom:"2px", fontSize:"90%"}}>Quantidade</text>
                                <text style={{fontSize:"80%"}}>{pintaMedia(nCreated, mediaCreated)}</text>
                                <text style={{fontSize:"80%"}}>{pintaMedia(nDeleted, mediaDeleted)}</text>
                            </div>
                            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginLeft:"20px"}}>
                                <text style={{fontWeight:"bolder", marginBottom:"5px", fontSize:"90%"}}>Média</text>
                                <text style={{fontSize:"80%"}}>{mediaCreated}</text>
                                <text style={{fontSize:"80%"}}>{mediaDeleted}</text>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        )}</div>)}
        {moduloStatusHorus && props.statusFiles.length !== 0 && (
            <div style={{display:"flex", flexDirection:"column", alignSelf:"flex-end", justifySelf:"flex-end"}}>
                <text style={{fontSize:"70%", marginBottom:"10px"}}>Último update: {dataIso2Br(dataMedia)}</text>
            </div>)}
        {props.statusFiles.length === 0 && moduloStatusHorus && (
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginBottom:"15px", marginTop:"5px"}}>
                <text style={{fontSize:"90%"}}>Este servidor não possui arquivos de vídeo.</text>
            </div>
        )}
        </div>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <h4 style={{margin:"0px"}}>Tamanho dos arquivos</h4>
                {boolErrTamanho && (txtErrTamanho())}
                {boolShowErrTamanho && (
                    warnings(errTamanho)
                )}
                
            </div>
            <button onClick={() => switchToggleArrow(moduloStatusTamanho, setModuloStatusTamanho, setArrowStatusTamanho)}
                    style={{fontSize:"70%", width:"20px", height:"20px", borderRadius:"100px", borderColor:"black", marginBlock:"5px", border:"1px solid black"}}>{arrowStatusTamanho}</button>
        </div>
        <div style={{height:"2px", width:"100%", borderColor:"black", backgroundColor:"black", opacity:"50%", marginBottom:"10px"}}></div>                
            {props.errStatusTamanho && moduloStatusTamanho ? (
                erroBanco()
            ):(<div>
            {props.statusTamanho.length === 0 && moduloStatusTamanho ? (
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginBottom:"10px", marginTop:"10px"}}>
                    <text style={{fontSize:"90%"}}>Sem câmeras com defeito.</text>
                </div>
            ):(<div>
            {boolTamanho && (dataStatusTamanho(props.statusTamanho))}
            {dicSoma && (mediaStatusTamanho())}
            {dicMedias && (listaFinalTamanhos())}
            {listaPOI && (txtErrTamanho)}
            {props.statusTamanho && moduloStatusTamanho && (
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around",marginTop:"10px", marginBottom:"10px"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"10px"}}>POI</text>
                    {dicMedias && (listaPOI.map(u => {
                        return(
                            <div style={{padding:"1px", paddingLeft:"4px", paddingRight:"4px"}}>
                                <text style={{fontSize:"90%"}}>{u}</text>
                            </div>) 
                        }))}
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"10px"}}>Tamaho (Mb)</text>
                    {dicMedias && (listaPOI.map(u => {
                        return(
                            <div style={{padding:"1px", paddingLeft:"4px", paddingRight:"4px"}}>
                                <text style={{fontSize:"90%"}}>{dicAtuais[u]}</text>
                            </div>)   
                        }))}
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"10px"}}>Média</text>
                    {dicMedias && (listaPOI.map(u => {
                        return(
                            <div style={{padding:"1px", paddingLeft:"4px", paddingRight:"4px"}}>
                                <text style={{fontSize:"90%"}}>{dicMedias[u]}</text>
                            </div>)   
                        }))}
                    </div>
                </div>
            )}</div>)}</div>)}

        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <h4 style={{margin:"0px"}}>Câmeras pretas</h4>
            <button onClick={() => switchToggleArrow(moduloStatusCamerasPretas, setModuloStatusCamerasPretas, setArrowStatusCamerasPretas)}
                    style={{fontSize:"70%", width:"20px", height:"20px", borderRadius:"100px", borderColor:"black", marginBlock:"5px", border:"1px solid black"}}>{arrowStatusCamerasPretas}</button>
        </div>
        <div style={{height:"2px", width:"100%", borderColor:"black", backgroundColor:"black", opacity:"50%", marginBottom:"10px"}}></div>
        {moduloStatusCamerasPretas && (
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around", marginTop:"10px", marginBottom:"10px"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"5px"}}>POI</text>
                <text style={{fontSize:"90%"}}>Acesso A</text>
                <text style={{fontSize:"90%"}}>CP Zara</text>
                <text style={{fontSize:"90%"}}>CP JohnJohn</text>
            </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"5px"}}>Última imagem boa</text>
                <text style={{fontSize:"90%"}}>Há 5 minutos</text>
                <text style={{fontSize:"90%"}}>Há 2 horas</text>
                <text style={{fontSize:"90%"}}>Há 1 hora</text>
            </div>

        </div>
        )}

        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <h4 style={{margin:"0px"}}>App SightCorp</h4>
                {props.statusSight && (boolCountSwitchSight(props.statusSight))}
                {boolErrSight && (txtErrSight())}
                {boolShowErrSight && (
                    warnings(errSight)
                )}
                
            </div>
            <button onClick={() => switchToggleArrow(moduloStatusSight, setModuloStatusSight, setArrowStatusSight)}
                    style={{fontSize:"70%", width:"20px", height:"20px", borderRadius:"100px", borderColor:"black", marginBlock:"5px", border:"1px solid black"}}>{arrowStatusSight}</button>
        </div>
        <div style={{height:"2px", width:"100%", borderColor:"black", backgroundColor:"black", opacity:"50%", marginBottom:"10px"}}></div>        
        
        {moduloStatusSight && (
        <div>
        {props.errStatusSight ?(
            erroBanco()
        ):(<div>
        {props.statusSight.length !== 0 ? (
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around", marginTop:"10px", marginBottom:"10px"}}>
            
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

                <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"5px"}}>POI</text>
               
                {props.statusSight && (props.statusSight.map(u => {

                    return (
                        <div style={{height:"10px", padding:"5px"}}>
                            <text style={{fontSize:"90%"}}>{u["poi"]}</text>
                        </div>
                    )}))}

            </div>

            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

                <text style={{fontWeight:"bolder", fontSize:"90%", marginBottom:"5px"}}>Estado</text>
                {props.statusSight && (props.statusSight.map(u => {
                    return (estadoSight(u["status"]))
                }))}

            </div>

        </div>):(
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginBottom:"10px", marginTop:"10px"}}>
                <text style={{fontSize:"90%"}}>Sem aplicativos SightCorp detectados.</text>
            </div>
        )}
        </div>)}
        </div>
        )}
    </div>
    )}
    </div>
  );
}

export default Card;