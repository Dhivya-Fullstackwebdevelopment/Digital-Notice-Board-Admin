
    export const ErrorMsg = ({ message }: { message?: string[] }) => (
        message ? <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 animate-pulse">{message[0]}</p> : null
    );
