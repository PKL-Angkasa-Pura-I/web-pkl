export default function Button({text, onClick, className}) {
    return (
        <button onClick={onClick} className={`bg-blue-700 hover:bg-blue-800 rounded-lg text-white font-bold px-6 py-2 ${className}`}>
            {text}
        </button>
    )
}