import 'dotenv/config';
import "reflect-metadata";
import app from '../src/boot/express';
import request from 'supertest';

describe('Sample Test', () => {

    it('should show error Unauthorized and status 401', async () => {
        const res = await request(app).get(`/v1.0/user/me`);
        expect(res.status).toEqual(401);
    });

    it('should respond with status code 400 because of missing params', async () => {
        const res = await request(app).post(`/v1.0/oauth/token`)
        expect(res.status).toEqual(400);
    });
    
})