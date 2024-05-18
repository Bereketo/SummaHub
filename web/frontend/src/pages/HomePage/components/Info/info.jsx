import React, {useState} from 'react'
import styles from "./info.module.css"
import data from "./data";

function Info() {
  const [selected, setSelected] = useState(null);

  function handleselection(getCurrentId){
    return () =>{
    setSelected(getCurrentId === selected ? null:getCurrentId)}
  }
  return (
    <div className={styles.info_wrapper}>
    <h1 className={styles.accor_title}>  How We Fulfill Your Needs:  <em>  Frequently Asked Questions</em> </h1>
    <div className ={styles.accordian}>
    {
      data && data.length > 0 ? (
        data.map((dataItem) => (
          <div className={styles.item}>
          <div onClick={handleselection(dataItem.id)} >
          <div className={styles.title}> 
          <h3> ❓{dataItem.question}</h3>
          <h1> + </h1>
          </div>

          
          {
            selected === dataItem.id ? 
            <div className={styles.content}>
            {dataItem.answer}</div> :null
            
          }
          </div>
          </div>
        ))
      ):( <div>"No data Found"</div>)
    }

    </div>
        
    </div>
  );
}

export default Info