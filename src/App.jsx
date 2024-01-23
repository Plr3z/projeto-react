import React, {useState} from "react";
import './App.css'
import $ from 'jquery'

function App(){

  const botaoAddTarefa = document.querySelector('.btn-add')
  const botaoFechar = document.querySelector('.close-btn')

  
  const [progresso, setProgresso] = useState([])
  const [tarefa, setTarefa] = useState()
  const [lista, setLista] = useState([])
  var contador = 0

  function adicinarTarefa(form){

    form.preventDefault()
    if(!tarefa){
      return;
    }

    setLista([{text: tarefa, isComplete: false}, ...lista])
    setTarefa("")

    $('.tarf').fadeOut(100)


  }


  const trocar = (index) => {
    const listaAux = [...lista]
    listaAux[index].isComplete = !listaAux[index].isComplete
    setLista(listaAux);
  }
    
  
    
  function pegarProgresso(){
      lista.forEach(element => {
        if(element.isComplete)
          contador++
      });
  }

  
  pegarProgresso()


  if(contador == lista.length){
    if(contador == 0 && lista.length == 0){
      $('.tarefas-completas').fadeOut(1)
    }else{
      $('.tarefas-completas').fadeIn(1)
    $('.concluido').stop().fadeIn()
    $('.tarefas-completas').css('background-color', 'green')
    $('.numeros').css('color', 'green')
    setInterval(function(){
        $('.concluido').stop().fadeOut()
    }, 3000)
    }
  }else{
    $('.tarefas-completas').css('background-color', 'black')
    $('.numeros').css('color', 'black')
  }
  

  

  


  $('body').on('click', '.close-btn', function(){
      $('.tarf').fadeOut()
  })

  $('body').on('click', '.btn-add', function(){
    $('.tarf').fadeIn()
})




  return(
    <>

      <div>


        <div className="concluido">
          <div>
            <h2>TODAS TAREFAS FEITAS COM SUCESSO!</h2>
          </div>
        </div>

          <div className="tarf">
            <div className="add-tarefa">
              <form onSubmit={adicinarTarefa}>
                
                <h2 style={{color: 'white', marginBottom: '20px'}}>ADICIONE UMA TAREFA</h2>
                <input type="text" value={tarefa} onChange={(e) => {setTarefa(e.target.value)}}/>
                <button type="submit">ADICIONAR</button>
                <button className="close-btn">CANCELAR</button>
                
              </form>
            </div>
          </div>

        <div className="progresso">
          <h2>TAREFAS</h2>
          <div>
            
            
            <p className="numeros">{contador}/{lista.length}</p>
            <div className="progress-bar">
              <div className="tarefas-completas" style={{width: `${contador*(100/lista.length)}%`} }></div>
            </div>
          </div>
        </div>

        <div>

          {
            lista.length < 1 ?
              <h1>VAMOS COMEÇAR?</h1>
            :
              lista.map((tarefa, index)=>(
                <div onClick={() => {trocar(index)}} className={tarefa.isComplete ? "list ativado" : "list"}>
                  <p  key={index}>{tarefa.text}</p>
                </div>

                
              ))  
          }
        
          


        </div>
        <div className="btn-add">
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>
    </>
  )
}

export default App