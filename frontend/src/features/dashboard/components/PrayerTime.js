
import React, { useEffect, useState } from 'react';

function PrayerTime() {
  const [times, setTimes] = useState({
    fajr: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: ''
  });

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const response = await fetch('http://api.aladhan.com/v1/timingsByCity?city=Amman&country=Jordan&method=1');
      const data = await response.json();
      const { timings } = data.data;
      setTimes({
        fajr: timings.Fajr,
        dhuhr: timings.Dhuhr,
        asr: timings.Asr,
        maghrib: timings.Maghrib,
        isha: timings.Isha
      });
    };

    fetchPrayerTimes();
  }, []);


  return (
    <div className="card bordered bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Prayer Times <span className="badge badge-warning gap-2">BETA</span></h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>Fajr</h3>
            <p>{times.fajr}</p>
          </div>
          <div>
            <h3>Dhuhr</h3>
            <p>{times.dhuhr}</p>
          </div>
          <div>
            <h3>Asr</h3>
            <p>{times.asr}</p>
          </div>
          <div>
            <h3>Maghrib</h3>
            <p>{times.maghrib}</p>
          </div>
          <div>
            <h3>Isha</h3>
            <p>{times.isha}</p>
          </div>
        </div>
      </div>
 
      

    </div>
  );
}

export default PrayerTime;