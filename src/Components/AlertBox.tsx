import Button from "./Button";

type Props = 
{
    title?: string,
    message: string,
    confirm: () => void,
    cancel: () => void
}

const AlertBox = (props: Props) => 
{
    const { message, confirm, cancel } = props;

    return (
        <div className='fixed top-0 right-0 h-screen w-screen flex justify-center items-center bg-black/[0.5]'>
            <div className='z-[3] fixed h-fit w-[30rem] flex flex-col gap-10 p-5 rounded-lg bg-white'>
                <p className='bg-white w-full text-center font-bold text-xl'>{props?.title? props?.title:"Alert"}</p>

                <p className="text-center">{message}</p>

                <div className="flex justify-center gap-2">
                    <Button 
                        className="px-5 py-1 rounded-sm bg-red-500 text-md font-bold text-white"
                        text={"Cancel"}
                        isDisabled={false}
                        onClick={cancel}
                    />

                    <Button 
                        className="px-5 py-1 rounded-sm bg-green-500 text-md font-bold text-white"
                        text={"Confirm"}
                        isDisabled={false}
                        onClick={confirm}
                    />
                </div>
            </div>
        </div>  
    )
}

export default AlertBox