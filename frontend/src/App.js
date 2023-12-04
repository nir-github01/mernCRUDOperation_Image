import logo from './logo.svg';
import './App.css';
import UploadImages from './modules/UploadImages';
import ImagesList from './modules/ImagesList';
import UpdateImages from './modules/UpdateImages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         <UploadImages />
         <ImagesList />
      </header>
    </div>
  );
}

export default App;
