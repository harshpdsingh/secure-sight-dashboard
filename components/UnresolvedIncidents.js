"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LuStore, LuClock, LuPlus, LuUsers, LuCheck } from 'react-icons/lu';
import { TriangleAlert } from 'lucide-react';
import { GiPistolGun } from 'react-icons/gi';

const UnresolvedIncidents = () => {
  const [incidents, setIncidents] = useState([]);

  // Load unresolved incidents from API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch('/api/incidents?resolved=false');
        const data = await res.json();
        setIncidents(data);
      } catch (error) {
        console.error('Failed to load incidents:', error);
      }
    };

    fetchIncidents();
  }, []);

  // Resolve an incident
  const resolveIncident = async (id) => {
    try {
      const res = await fetch(`/api/incidents/${id}/resolve`, {
        method: 'PATCH',
      });
      if (res.ok) {
        setIncidents((prev) => prev.filter((incident) => incident.id !== id));
      }
    } catch (error) {
      console.error('Failed to resolve incident:', error);
    }
  };

  return (
    <div className="w-1/2 bg-[#121212] text-gray-200 p-4 md:p-6 rounded-xl shadow-2xl flex flex-col h-[600px]">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <TriangleAlert className="text-red-500 mr-3" size={24} />
          {incidents.length} Unresolved Incidents
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-400">
            <button className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"><LuPlus size={20} /></button>
            <button className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"><LuUsers size={20} /></button>
          </div>
          <a href="#" className="flex items-center text-sm text-green-400 hover:text-green-300 transition-colors">
            <LuCheck className="mr-1" />
            4 resolved incidents
          </a>
        </div>
      </header>

      {/* Scrollable list */}
      <div className="flex-grow overflow-y-auto pr-2">
        <div className="space-y-4">
          {incidents.map(({ id, type, location, timestamp, image }) => {
            const iconProps = {
              'Gun Threat': {
                Icon: GiPistolGun,
                color: 'text-red-500',
              },
              'Unauthorised Access': {
                Icon: TriangleAlert,
                color: 'text-orange-400',
              },
            }[type] || {
              Icon: TriangleAlert,
              color: 'text-gray-400',
            };

            return (
              <div key={id} className="flex items-center bg-[#1e1e1e] p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="relative w-24 h-16 mr-4 flex-shrink-0">
                  <Image
                    src={image}
                    alt={type}
                    layout="fill"
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className={`font-semibold flex items-center ${iconProps.color}`}>
                    <iconProps.Icon className="inline-block mr-2" />
                    {type}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center mt-1.5">
                    <LuStore className="mr-2 flex-shrink-0" />
                    {location}
                  </p>
                  <p className="text-sm text-gray-400 flex items-center mt-1">
                    <LuClock className="mr-2 flex-shrink-0" />
                    {timestamp}
                  </p>
                </div>
                <button
                  onClick={() => resolveIncident(id)}
                  className="ml-4 text-yellow-500 hover:text-yellow-400 font-semibold text-sm transition-colors"
                >
                  Resolve &gt;
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnresolvedIncidents;
