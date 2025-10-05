export default function ChevronsDown() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 7l5 5l5 -5">
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 4; 0 0"
                    dur="1.2s"
                    repeatCount="indefinite"
                />
            </path>
            <path d="M7 13l5 5l5 -5">
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 4; 0 0"
                    dur="1.2s"
                    begin="0.2s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    );
}
