import React, {useState} from 'react'
import styles from "./info.module.css"
import data from "./data";

function Info() {
  const [selected, setSelected] = useState(null);

// sourcery skip: avoid-function-declarations-in-blocks
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
        
          <div onClick={handleselection(dataItem.id)}   key={dataItem.id} className={`${styles.item} ${selected === dataItem.id ? styles.selected : ''}`}>
         
          <div className={styles.title}>
          <div className={styles.left_title}>
          <img src='./images/question.png' width={25} className={styles.faq_img} alt='po'/> 
          <h3> {dataItem.question}</h3>
          </div>
          <h1> + </h1>
          </div>

          
          {
            selected === dataItem.id ? 
            <div className={styles.content}>
            {dataItem.answer}</div> :null
            
          }
          
          </div>
        ))
      ):( <div>"No data Found"</div>)
    }

    </div>
        
    </div>
  );
}

export default Info