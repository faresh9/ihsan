import React from 'react';
import withComingSoon from '../../../routes/withComingSoon';

function PrayerTime({ fajr, dhuhr, asr, maghrib, isha }) {
  return (
    <div className="card bordered bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Prayer Times</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>Fajr</h3>
            <p>{fajr}</p>
          </div>
          <div>
            <h3>Dhuhr</h3>
            <p>{dhuhr}</p>
          </div>
          <div>
            <h3>Asr</h3>
            <p>{asr}</p>
          </div>
          <div>
            <h3>Maghrib</h3>
            <p>{maghrib}</p>
          </div>
          <div>
            <h3>Isha</h3>
            <p>{isha}</p>
          </div>
        </div>
      </div>
 
      

    </div>
  );
}

export default withComingSoon(PrayerTime);