import nodemailer from 'nodemailer';

class Mailer {
    private readonly transporter: nodemailer.Transporter;
    private readonly user: string = '';
    private readonly password: string = '';
    private readonly host: string = 'smtp.google.com';
    public static instance: Mailer | null = null;

    private constructor () {
        this.transporter = nodemailer.createTransport({
            host: this.host,
            port: 465,
            secure: true,
            auth: {
                user: this.user,
                pass: this.password
            }
        });
    }

    public static getInstance (): Mailer {
        if (!Mailer.instance) {
            Mailer.instance = new Mailer();
        }
        return Mailer.instance;
    }

    public async sendMail (code: number, to: string): Promise<nodemailer.SentMessageInfo> {
        try {
            const message = {
                from: this.user,
                to,
                subject: 'Invitation code',
                text: `Your invitation code is: ${code}`
            };
            return this.transporter.sendMail(message);
        }
        catch (err) {
            throw err
        }
    }
}

export default Mailer;