import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as  cocomodel from "@tensorflow-models/coco-ssd";
import "./App.css";
import { useEffect, useState } from "react";
const App = () => {
  const [model, setmodel] = useState();     // import model with use state to interact MACHINE LEARNING
  const [object, setobject] = useState("");  // import use state to get class in API
  const [score, setscore] = useState("");    // import  use state to get score in API

  async function loadmodel() {
    try{
    const dataset = await cocomodel.load(); // to get load model data resources machine learning 
    setmodel(dataset);
    console.log('dataset ready...') // condition with if data ready to set
    } catch(err) {   
      console.log(err)
    }
  }


  const videOption = { // video option to custom the frame video
    width: 720,
    height: 420,
    facingMode: 'environment'
  }

  
  useEffect(() => {
    tf.ready().then(() => { // load machine learning ketika refresh
      loadmodel();
    })
  }, [])

  async function predict() {
  const detection =  await model.detect(document.getElementById('videoSource')) //  get id from html button to interact button 
  if(detection.length > 0) {
    detection.map((result, i) => {
      console.log(result.class) // mapping data to get class  
      console.log(result.score) // mapping data to get score 
      setobject(result.class)  // set object to change data class object
      setscore(result.score)  // set object to change score class object
    })
  }
  console.log(detection)
  }


  return(
  <div className="App">
    <h2>Machine Learning with Jarvis</h2>
    <h2>{object ? object : ''}</h2>
    <h2>{score ? score : ''}</h2>
    <button onClick={() => predict()} className="button">Tebak Benda</button>
    <Webcam 
    id="videoSource"
    audio = {false}
    videoConstraints= {videOption}  // setting webcam from library
    className="video"
    />
  </div>
  );

}
export default App;
