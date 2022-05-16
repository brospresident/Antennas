import express from 'express';
import IController from '../controller';
import antennaModel from '../../models/antenna.model';

export default class AntennaController implements IController {
    public readonly router: express.Router;
    public readonly path: string = '/antennas';

    public constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.path}/`, this.getAntennas);
        this.router.post(`${this.path}/`, this.createAntenna);
    }

    private async getAntennas(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const antennas = await antennaModel.find();
        res.status(200).json(antennas);
    }

    private async createAntenna(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const { provider, lat, lng } = req.body;
        if (!provider || !lat || !lng) {
            res.status(400).json({
                message: 'Missing required fields'
            });
            return;
        }

        const antenna = await antennaModel.create({ provider, lat, lng });
        res.status(201).json(antenna);
    }
}