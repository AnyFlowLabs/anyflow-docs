import React, { useEffect } from 'react';

interface Props {
    content: string;
}

export default function PlainTextResponse({ content }: Props) {
    useEffect(() => {
        // Set content type to plain text on client side
        if (typeof document !== 'undefined') {
            document.body.innerHTML = '';
            document.body.style.fontFamily = 'monospace';
            document.body.style.whiteSpace = 'pre-wrap';
            document.body.style.margin = '0';
            document.body.style.padding = '1rem';
            document.body.textContent = content;
        }
    }, [content]);

    // For SSR, return a simple pre element
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="Content-Type" content="text/plain; charset=utf-8" />
            </head>
            <body style={{
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                margin: 0,
                padding: '1rem',
                backgroundColor: 'white',
                color: 'black'
            }}>
                {content}
            </body>
        </html>
    );
} 