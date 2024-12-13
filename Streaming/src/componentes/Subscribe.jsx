import React, { useState } from 'react';

const Subscribe = ({ userId }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/users/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté almacenado
                },
                body: JSON.stringify({ cardNumber, expirationDate, cvv, userId })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al procesar la suscripción');
            }

            setMessage(data.message);
        } catch (error) {
            console.error('Error al suscribirse:', error);
            setMessage('Error al procesar la suscripción: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="subscribe">
            <h2>Suscribirse a Premium</h2>
            <form onSubmit={handleSubscribe}>
                <div>
                    <label>Número de tarjeta:</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de expiración:</label>
                    <input
                        type="text"
                        placeholder="MM/AA"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>CVV:</label>
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Suscribirse'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Subscribe;