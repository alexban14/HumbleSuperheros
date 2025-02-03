import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSuperheroForm = () => {
    const [name, setName] = useState('');
    const [superpower, setSuperpower] = useState('');
    const [humilityScore, setHumilityScore] = useState('');
    const [error, setError] = useState('');

    const apiUrl = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !superpower || !humilityScore) {
            setError('All fields are required');
            return;
        }

        const humility = parseInt(humilityScore, 10);
        if (isNaN(humility) || humility < 1 || humility > 10) {
            setError('Humility score must be a number between 1 and 10');
            return;
        }

        const superhero = {
            name,
            superpower,
            humility_score: humility,
        };

        try {
            const response = await fetch(apiUrl + '/superheros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(superhero),
            });

            if (response.status === 201) {
                setName('');
                setSuperpower('');
                setHumilityScore('');
                setError('');

                navigate('/');
            } else {
                setError('Failed to create superhero');
            }
        } catch (err) {
            setError('An error occurred while creating superhero');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen bg-gray-100">
            <div className="w-full max-w-md p-6 space-y-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Create New Superhero</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="text-red-500">{error}</div>}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="superpower" className="block text-sm font-medium text-gray-700">
                            Superpower
                        </label>
                        <input
                            type="text"
                            id="superpower"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={superpower}
                            onChange={(e) => setSuperpower(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="humilityScore" className="block text-sm font-medium text-gray-700">
                            Humility Score (1-10)
                        </label>
                        <input
                            type="number"
                            id="humilityScore"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={humilityScore}
                            onChange={(e) => setHumilityScore(e.target.value)}
                            required
                            min="1"
                            max="10"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Create Superhero
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSuperheroForm;
