import React, { useEffect, useState } from 'react'
import './Booking.css'

type TUser = {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

type TCustomer = {
    customer_id: number;
    phone_number: string;
    address: string;
    user: TUser;
}

type TCar = {
    car_id: number;
    make: string;
    model: string;
    year: string;
    color: string;
    rental_rate: string;
    availability: boolean;
    location_id: number;
}

type TBooking = {
    booking_id: number;
    customer_id: number;
    car_id: number;
    rental_start_date: string;
    rental_end_date: string;
    total_amount: string;
    status: string;
    customer: TCustomer;
    car: TCar;
}
const API_URL = 'http://localhost:5000';



const Booking = () => {
    const [bookings, setBookings] = useState<TBooking[]>([]);
   
    const fetchBookings = async () => {
        try {
            const response = await fetch(`${API_URL}/bookings`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBookings(data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }

    useEffect(() => {
        fetchBookings();
    }, []);

   
    const fetchBookingById = async (bookingId: string) => {
        try {
            const response = await fetch(`${API_URL}/bookings/${bookingId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBookings([data.booking]); // Set the bookings state to the single booking found
        } catch (error) {
            console.error('Error fetching booking by ID:', error);
            alert('Booking not found. Please check the Booking ID and try again.');
        }
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const bookingIdInput = (document.getElementById('booking-id') as HTMLInputElement).value;
        if (bookingIdInput) {
            fetchBookingById(bookingIdInput);
        } else {
            alert('Please enter a Booking ID.');
        }
    }



   
       
    return (
        <div className="bookings-container">
            <h2>Car Rental Bookings</h2>
            <div className="booking-id">
                <label htmlFor="booking-id">Booking ID:</label>
                <input type="text" id="booking-id" placeholder="Enter Booking ID" />
                <button onClick={handleSubmit}>Search</button>
            </div>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="bookings-grid">
                    {bookings.map((booking) => (
                        <div key={booking.booking_id} className="booking-card">
                            <div className="booking-header">
                                <h3>Booking #{booking.booking_id}</h3>
                                <span className={`status ${booking.status}`}>{booking.status}</span>
                            </div>
                            <div className="customer-info">
                                <h4>Customer Details</h4>
                                <p>{booking.customer.user.first_name} {booking.customer.user.last_name}</p>
                                <p>📞 {booking.customer.phone_number}</p>
                                <p>📧 {booking.customer.user.email}</p>
                            </div>
                            <div className="car-info">
                                <h4>Car Details</h4>
                                <p>{booking.car.year} {booking.car.make} {booking.car.model}</p>
                                <p>Color: {booking.car.color}</p>
                                <p>Rate: ${booking.car.rental_rate}/day</p>
                            </div>
                            <div className="booking-details">
                                <h4>Rental Period</h4>
                                <p>From: {new Date(booking.rental_start_date).toLocaleDateString()}</p>
                                <p>To: {new Date(booking.rental_end_date).toLocaleDateString()}</p>
                                <p className="total-amount">Total: ${booking.total_amount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Booking
