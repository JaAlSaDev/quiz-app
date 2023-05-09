import { useState } from "react"

import MainPage from "./Pages/MainPage"
import CreateQuizPage from "./Pages/CreateQuiz"
import Button from "./Components/Button"

import "./App.css"

enum Pages 
{  
    MAIN_PAGE, 
    CREATE_PAGE, 
    VIEW_PAGE 
};

const App = () => 
{
    const [currentPage, setCurrentPage] = useState<Pages>(Pages.MAIN_PAGE)

    const navigateToCreatePage = () => setCurrentPage(Pages.CREATE_PAGE);

    const navigateToViewPage = () => setCurrentPage(Pages.VIEW_PAGE);

    const PagesObject =
    {
        [Pages.MAIN_PAGE]: 
          <MainPage 
            navigateToCreatePage={navigateToCreatePage} 
            navigateToViewPage={navigateToViewPage}
          />,
        [Pages.CREATE_PAGE]: <CreateQuizPage />,
        [Pages.VIEW_PAGE]: <></>
    }

  return (
    <div className="h-screen w-screen flex flex-col items-center">
        <p className="h-fit my-3 text-7xl">Ultimate Quiz Creator</p>

        {PagesObject[currentPage]}
    </div>
  );
}

export default App;