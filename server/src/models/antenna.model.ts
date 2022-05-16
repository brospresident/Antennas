import mongoose from 'mongoose';
import IAntenna from '../controllers/Antennas/antenna.interface';

const antennaSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    positionX: {
        type: Number,
        required: true
    },
    positionY: {
        type: Number,
        required: true
    }
});

const antennaModel = mongoose.model<IAntenna & mongoose.Document>('Antenna', antennaSchema);
export default antennaModel;