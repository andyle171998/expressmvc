import 'dotenv/config';
import "reflect-metadata";
import app from 'boot/express';

const runApp = () => {
    try {
        app.listen(process.env.PORT, () => console.log(`App listening at ${process.env.PORT}`))
    } catch (error) {
        console.error(error, 'err');
        process.exit(1);
    }

}

runApp();