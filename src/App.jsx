import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import useUser from "./hooks/useUser";


function App() {
  const { user, isFetching } = useUser()

  if (isFetching) {
    return <div className="flex flex-col pb-4 pt-4 justify-center items-center w-screen h-dvh bg-bg bg-cover blur-sm lg:pt-16"></div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<ProtectedRoute user={user}><Home /></ProtectedRoute>}></Route>
        <Route path="login" element={<Auth user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
