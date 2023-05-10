import React from 'react'
import Button from '../Components/Button'

type Props = 
{
    navigateToCreatePage: Function,
    navigateToViewPage: Function
}

const MainPage = (props: Props) => 
{

    const { navigateToCreatePage, navigateToViewPage } = props

    return (
        <div className='h-full flex flex-col items-center'>
            <p>Welcome to the quiz creator...</p>

            <p>How can I help you?</p>

            <div className="flex h-fit mt-4 gap-3">
                <Button 
                    className="py-3 px-4 rounded-lg"
                    text={"Create a new quiz!"}
                    onClick={navigateToCreatePage}
                />

                <Button 
                    className="py-3 px-4 rounded-lg"
                    text={"View existing quizes"}
                    onClick={navigateToViewPage}
                />
            </div>
        </div>
    )
}

export default MainPage