//import globals.css from styles
//using @/* to import from src folder
import '@styles/globals.css'

// export a metadata object with title as "promptopia" and a description as "a prompt generator for writers"
export const meta = {
    title: "promptopia",
    description: "a prompt generator for writers"
}

const RootLayout = ({children}) => {
    return (
        <html lang="en">
            {/* <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <meta name="description" content={meta.description} />
                <title>{meta.title}</title>
            </head> */}
            <body>
                <div className="main">
                    <div className='gradient'/>
                </div>
            </body>
            <main className='app'>
                {children}
            </main>
        </html>
    )
}

export default RootLayout