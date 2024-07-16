import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/404";
import StoryGenerate from "./components/StoryGenrate/StoryGenerate";
import ContinueStory from "./components/ContinueStory/ContinueStory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/generate-story" element={<StoryGenerate />}></Route>
        <Route path="/continue-story/:id" element={<ContinueStory />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
