import Container from "@mui/material/Container";
import {Routes, Route} from "react-router-dom"
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import NotFound from "./components/NotFound";

function App() {  
  return (
    <>
      <Header />
      <Container maxWidth="lg" >
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/tags/:tag" element={<Home />}/>
          <Route path="/posts/:id" element={<FullPost />}/>
          <Route path="/posts/:id/edit" element={<AddPost />}/>
          <Route path="/add-post" element={<AddPost />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Registration />}/>
          <Route path="*" element={<NotFound message="Вернись на главную страницу!" />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;