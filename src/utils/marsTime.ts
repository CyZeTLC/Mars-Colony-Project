export const calculateMarsSolDate = (earthDate: Date): { sol: number, time: string } => {
    const MS_PER_DAY = 86400000.0;
    
    // JD am heutigen Tag (in UTC)
    const currentMsSinceJ2000 = earthDate.getTime() / MS_PER_DAY;
    const JD = currentMsSinceJ2000 + 2440587.5;

    const J2000_MARS_EPOCH = 2451549.5;
    const SOLS_PER_EARTH_DAY = 1.0 / 1.0274912517;
    const MSD_OFFSET = 44796.0 - 0.0009626;

    const msd = ((JD - J2000_MARS_EPOCH) * SOLS_PER_EARTH_DAY) + MSD_OFFSET;

    const solNumber = Math.floor(msd);
    const solTimeFraction = msd - solNumber;
    const marsHours = Math.floor(solTimeFraction * 24);
    const marsMinutes = Math.floor((solTimeFraction * 24 - marsHours) * 60);

    const timeString = `${marsHours.toString().padStart(2, '0')}:${marsMinutes.toString().padStart(2, '0')}`;

    return { sol: solNumber, time: timeString };
};