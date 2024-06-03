import Header from "./components/Header"
import Body from "./components/Body"


function App() {
  return (
    <div className="flex flex-col pb-4 pt-4 justify-center items-center w-screen h-dvh bg-bg bg-cover lg:pt-16">
      <Header />
      <Body />
    </div>
  )
}

export default App
