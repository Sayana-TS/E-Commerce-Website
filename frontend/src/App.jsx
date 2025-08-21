import { Routes, Route } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen"
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import Header from "./components/Header"
import { Container } from "react-bootstrap"
import {ToastContainer} from "react-toastify"
import ProductListScreen from "./screens/Admin/ProductListScreen"
import ProductAddScreen from "./screens/Admin/ProductAddScreen"
import ProductEditScreen from "./screens/Admin/ProductEditScreen"
import ProductScreen from "./screens/ProductScreen"

function App() {

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            <Route path="/product/:id" element={<ProductScreen/>} />


            <Route path="/admin/productlist" element={<ProductListScreen/>} />
            <Route path="/admin/addProduct" element={<ProductAddScreen/>} />
            <Route path="/admin/edit/:id" element={<ProductEditScreen/>} />
          </Routes>
        </Container>
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
