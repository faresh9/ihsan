import React from 'react';

function PrayerTime({ fajr, dhuhr, asr, maghrib, isha }) {
  return (
    <div className="card bordered bg-base-200">
    
        
        <iframe src="https://timesprayer.com/widgets.php?frame=1&amp;lang=en&amp;name=amman&amp;avachang=true" style={{border: 'none', overflow: 'hidden', width: '100%', height: '185px'}}></iframe>

    </div>
  );
}

export default PrayerTime;