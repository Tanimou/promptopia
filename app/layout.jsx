//import globals.css from styles
//using @/* to import from src folder
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
// export a metadata object with title as "promptopia" and a description as "a prompt generator for writers"
export const meta = {
    title: "promptopia",
    description: "Discover & Share AI prompts"
}

const RootLayout = ({children}) => {
    return (
        <html lang="en">
{/*

<head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={meta.description} />
    <title>{meta.title}</title>
</head> */}

<body>
    <Provider>
        <div className="main">
            <div className='gradient' />
        </div>
        <main className='app'>
            {/* call the Nav component */}
            <Nav />
            {children}
        </main>
    </Provider>
</body>

</html>
    )
}

export default RootLayout