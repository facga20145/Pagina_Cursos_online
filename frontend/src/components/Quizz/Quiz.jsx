import React, { useState } from "react";
import "./Quiz.css";
import Header from "../header/HeaderAdult/Header";

const Quiz = () => {
   // Estados
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [score, setScore] = useState(0);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [showFeedback, setShowFeedback] = useState(false);
   const [isCorrect, setIsCorrect] = useState(false);
 
  // Arrays de preguntas relacionadas con fundamentos de programación
  const questionsArray = [
    {
      question: "¿Qué significa la sigla 'HTML'?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperText Machine Language",
      ],
      correct: 0,
    },
    {
      question: "¿Qué es un bucle en programación?",
      options: [
        "Una estructura que permite repetir un bloque de código",
        "Una función que siempre retorna un valor",
        "Un tipo de variable especial",
      ],
      correct: 0,
    },
    {
      question: "¿Qué valor devuelve 'true && false' en JavaScript?",
      options: ["true", "false", "undefined"],
      correct: 1,
    },
    {
      question: "¿Cómo defines una variable en JavaScript?",
      options: ["var", "let", "const", "Todas las anteriores"],
      correct: 3,
    },
    {
      question: "¿Qué estructura se utiliza para tomar decisiones en programación?",
      options: ["if/else", "while", "for", "return"],
      correct: 0,
    },
    {
      question: "¿Qué operador se utiliza para la comparación estricta en JavaScript?",
      options: ["==", "===", "!=", "="],
      correct: 1,
    },
    {
      question: "¿Qué tipo de dato es 'true' o 'false'?",
      options: ["String", "Boolean", "Number", "Array"],
      correct: 1,
    },
    {
      question: "¿Qué palabra clave se utiliza para declarar una función en JavaScript?",
      options: ["func", "function", "declare", "method"],
      correct: 1,
    },
    {
      question: "¿Cuál de las siguientes estructuras se usa para iterar un número fijo de veces?",
      options: ["for", "while", "do...while", "if"],
      correct: 0,
    },
    {
      question: "¿Qué método se utiliza para agregar un elemento al final de un array en JavaScript?",
      options: [".push()", ".add()", ".append()", ".concat()"],
      correct: 0,
    },
  ];



  // Manejar la selección de una respuesta
  const handleAnswer = (index) => {
    const isAnswerCorrect = index === questionsArray[currentQuestionIndex].correct;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      setScore(score + 1);
    }
  };

  // Pasar a la siguiente pregunta
  const handleNextQuestion = () => {
    setShowFeedback(false);

    if (currentQuestionIndex < questionsArray.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsModalVisible(true); // Muestra el modal al finalizar
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); // Cierra el modal
    setCurrentQuestionIndex(0); // Reinicia el quiz
    setScore(0); // Reinicia el puntaje
  };

  // Pregunta actual
  const currentQuestion = questionsArray[currentQuestionIndex];
return (
  <>
    <Header isWhite={true} />
    <div className="quiz-body">
      <div className="quiz-container">
        <h2 className="quiz-title">Quiz para Optar a la Beca de Programación</h2>
        <h3 className="quiz-question">{currentQuestion.question}</h3>
        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="quiz-button"
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>
        {showFeedback && (
          <div className="quiz-feedback">
            <p className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
              {isCorrect ? "¡Correcto!" : "Incorrecto. Intenta la siguiente pregunta."}
            </p>
            <button onClick={handleNextQuestion} className="quiz-next-button">
              {currentQuestionIndex < questionsArray.length - 1 ? "Siguiente" : "Finalizar"}
            </button>
          </div>
        )}
        <p className="quiz-score">Puntaje: {score}</p>
      </div>
    </div>

    {isModalVisible && (
      <div className="modal">
        <div className="modal-content">
          <h3>¡Quiz finalizado!</h3>
          <p>Tu puntaje es: {score} de {questionsArray.length}.</p>
          <p>
            {score >= 7
              ? "¡Felicidades! Eres elegible para optar a la beca."
              : "¡Sigue practicando y vuelve a intentarlo!"}
          </p>
          <button className="close-button" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>
    )}
  </>
);
};

export default Quiz;