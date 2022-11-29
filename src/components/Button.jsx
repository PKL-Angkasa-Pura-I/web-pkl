export default function Button({text, onClick, className, type}) {
    return (
        <button onClick={onClick} type={type} className={`bg-blue-700 hover:bg-blue-800 rounded-lg text-white font-bold px-6 py-2 ${className}`}>
            {text}
        </button>
    )
}