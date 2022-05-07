import mongoose from 'mongoose';

class Mongo {
    private static instance: Mongo | null = null;
    private uri: string = 'mongodb+srv://admin:admin@antennas.hg43f.mongodb.net/antennas?retryWrites=true&w=majority';

    private constructor() {
        this.init();
        this.handleErrors();
    }   

    public static getInstance(): Mongo {
        if (!Mongo.instance) {
            Mongo.instance = new Mongo();
        }
        return Mongo.instance;
    }

    private async init(): Promise<void> {
        try {
            await mongoose.connect(this.uri);
            console.log(`[Database]: Connection established at ${new Date().toLocaleString()}`);
        }
        catch (e) {
            console.error(e);
        }
    }

    private handleErrors(): void {
        mongoose.connection.on('error', (err) => {
            console.error(err);
        });
    }

    public checkConnection(): boolean {
        return mongoose.connection.readyState === 1;
    }
}

export default Mongo.getInstance();