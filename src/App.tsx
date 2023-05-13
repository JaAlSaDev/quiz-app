import { useState } from "react"

import MainPage from "./Pages/MainPage"
import CreateQuizPage from "./Pages/CreateQuiz/CreateQuiz"

import "./App.css"
import ViewPage from "./Pages/ViewPage"

enum Pages 
{  
    MAIN_PAGE, 
    CREATE_PAGE, 
    VIEW_PAGE 
};

const App = () => 
{
    const [currentPage, setCurrentPage] = useState<Pages>(Pages.MAIN_PAGE)

    const navigateToMainPage = () => setCurrentPage(Pages.MAIN_PAGE);

    const navigateToCreatePage = () => setCurrentPage(Pages.CREATE_PAGE);

    const navigateToViewPage = () => setCurrentPage(Pages.VIEW_PAGE);

    const PagesObject =
    {
        [Pages.MAIN_PAGE]: 
          <MainPage 
            navigateToCreatePage={navigateToCreatePage} 
            navigateToViewPage={navigateToViewPage}
          />,
        [Pages.CREATE_PAGE]: 
          <CreateQuizPage navigateToMainPage={navigateToMainPage} />,
        [Pages.VIEW_PAGE]: 
          <ViewPage navigateToMainPage={navigateToMainPage} />
    }

  return (
    <div className="h-screen w-screen flex flex-col items-center">
        <p className="h-fit my-3 text-7xl text-center">Ultimate Quiz Creator</p>

        {PagesObject[currentPage]}
    </div>
  );
}

export default App;