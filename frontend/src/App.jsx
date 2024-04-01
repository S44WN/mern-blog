import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<h1>Signin</h1>} />
        <Route path="signup" element={<h1>Signup</h1>} />
      </Route>
      {/* <Route path="/editor" element={<Editor />} /> */}
    </Routes>
  );
};

export default App;
