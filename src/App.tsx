import { useState } from "react"

import CreateQuizPage from "./Sections/CreateQuiz/CreateQuiz"

import Button from "./Components/Button"

import "./App.css"
import Quizes from "./Sections/ViewQuizes/Quizes"

const App = () => 
{
    const [isCreateQuizOn, setIsCreateQuizOn] = useState<boolean>(false)

    const closeQuizForm = () => setIsCreateQuizOn(false);

    const openQuizForm = () => setIsCreateQuizOn(true);

  return (
    <div className="h-screen w-screen flex flex-col items-center">
        <p className="h-fit my-3 text-7xl text-center">Ultimate Quiz Creator</p>
        
        <p>Welcome to the quiz creator...</p>

            <p>How can I help you?</p>

            <div className="flex h-fit mt-4 gap-3">
                <Button 
                    className="py-3 px-4 rounded-lg"
                    text={"Create a new quiz!"}
                    onClick={openQuizForm}
                />
            </div>


        <Quizes isCreateQuizOn={isCreateQuizOn} />

        {isCreateQuizOn && <CreateQuizPage closeQuizForm={closeQuizForm} />}
    </div>
  );
}

export default App;