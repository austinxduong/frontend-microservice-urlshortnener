import { useState } from 'react';

export function CopyToClipboard({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);


async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand('copy', true, text);
    }
}

const handleCopyClick = () => [
    copyTextToClipboard(copyText)
        .then(() => {
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false);
            }, 1500)
        })
        .catch((err) => {
            console.log(err)
        })
]

return (
    <div>
        <input type="text" value={copyText} />   
        <button onClick={handleCopyClick}> 
            <span>{isCopied ? 'Copied' : 'Copy'}</span>
        </button>     
    </div>
)
}