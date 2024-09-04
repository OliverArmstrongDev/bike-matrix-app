import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyBikes from "./pages/bikes/MyBikes";
import AddBike from "./pages/bikes/AddBike";
import EditBike from "./pages/bikes/EditBike";

const App = () => (
  <Routes>
    <Route path="/" element={<MyBikes />} />
    <Route path="add" element={<AddBike />} />
    <Route path="edit/:id" element={<EditBike />} />
  </Routes>
);

export default App;
