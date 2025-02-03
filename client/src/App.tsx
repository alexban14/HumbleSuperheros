import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawerAppBar from './components/DrawerAppBar';
import SuperheroList from './components/SuperheroList';  // Component for listing superheroes
import CreateSuperheroForm from './components/CreateSuperheroForm';  // Component for creating superheroes

const App = () => {
    return (
        <Router>
            <DrawerAppBar />
            <div>
                <Routes>
                    <Route path="/" element={<SuperheroList />} />
                    <Route path="/create-superhero" element={<CreateSuperheroForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
