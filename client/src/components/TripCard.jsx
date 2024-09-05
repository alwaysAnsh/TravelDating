import React from 'react';

const TripCard = ({ title, source, destination, dates, itinerary, budget, participants, createdAt, creator }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden flex flex-row  shadow-lg bg-gradient-to-r from-orange-100 to-cyan-400 text-black">
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Source:</strong> {source}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Destination:</strong> {destination}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Dates:</strong> {new Date(dates.start).toLocaleDateString()} - {new Date(dates.end).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Itinerary:</strong> {itinerary}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Budget:</strong> ${budget}
                </p>
                {/* <p className="text-gray-700 text-base mb-2">
                    <strong>Participants:</strong> {participants.join(', ')}
                </p> */}
                <p className="text-gray-700 text-base mb-2">
                    <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Creator:</strong> {creator}
                </p>
            </div>
        </div>
    );
};

export default TripCard;
