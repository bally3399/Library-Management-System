import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';


const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        profileSummary: '',
        password: '',
        confirmPassword: ''
    });

    const [memberId, setMemberId] = useState(null);

    useEffect(() => {
        // Add logic to fetch member details
       const token = localStorage.getItem('token');
       if (token) {
        try {
            // Decode the JWT to get user info including email
            const decodedToken = jwtDecode(token);

            // Assuming your JWT contains userId/memberId claim
            setMemberId(decodedToken.memberId || decodedToken.userId || decodedToken.id)
        
          // Optionally pre-fill email if it's in the token
          if (decodedToken.email) {
            setFormData(prev =>({
              ...prev,
              email: decodedToken.email
            }));
          }
        }catch (error) {
            console.error('Error decoding token:', error);
       }
      }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

   // const getmemberIdbyEmail = token.jwtVerify(email);
  //  const memberId = getmemberIdbyEmail;

    const [name, setName] = useState(formData.name);
    const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth);
    const [profileSummary, setProfileSummary] = useState(formData.profileSummary);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to handle profile update

        const base_url =  'https://api.fortunaelibrary-api.com';

        try {
            const response = await fetch(`${base_url}/api/Auth/update-profile?userId=${memberId}`, {
                method: "PUT",  // or "PUT" depending on API implementation
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    dateOfBirth: dateOfBirth,
                    profileSummary: profileSummary
                }),
            });
    
            if (response.ok) {
                alert('Book returned successfully');
                // Reset form fields
//                setBookId('');
  ///              setMemberId('');
     //           setComments('');
            } else {
                const errorData = await response.json();
                alert(`Failed to update Profile: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error updating Profile:", error);
            alert("An error occurred while updating the profile.");
        }

        console.log('Profile updated:', formData);
    };

    return (
        <div className="update-profile max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-gray-700">DateOfBirth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="profileSummary" className="block text-gray-700">profileSummary:</label>
                    <textarea type="text"
                        id="profileSummary"
                        name="profileSummary"
                        value={formData.profileSummary}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                    </textarea>

                </div>



                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button style={{ background: "#a47a47"}} type="submit" className="w-full bg-yellow-950 text-white py-2 rounded-md hover:bg-yellow-600">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;