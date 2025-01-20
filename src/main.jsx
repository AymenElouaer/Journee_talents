import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './store'; // Ensure you're importing store and persistor

const container = document.getElementById('root'); // Selecting the container
const root = createRoot(container); // Creating the root

root.render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}> {/* Wrap with PersistGate */}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>
);
